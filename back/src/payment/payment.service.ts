import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Stripe from 'stripe';
import { Payment } from './entities/payment.entity';
import { User } from '../modules/user/entities/user.entity';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly configService: ConfigService,
  ) {
    const stripeSecretKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    if (!stripeSecretKey) {
      throw new InternalServerErrorException('Stripe secret key not configured');
    }
    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2025-02-24.acacia',
    });
  }

  async createCheckoutSession(user: User, priceId: string) {
    try {
      // Get or create Stripe customer
      let customer: Stripe.Customer;
      const existingCustomers = await this.stripe.customers.list({
        email: user.email,
        limit: 1,
      });

      if (existingCustomers.data.length > 0) {
        customer = existingCustomers.data[0];
      } else {
        customer = await this.stripe.customers.create({
          email: user.email,
          name: `${user.name} ${user.lastname}`,
          metadata: {
            userId: user.id,
          },
        });
      }

      // Create checkout session
      const session = await this.stripe.checkout.sessions.create({
        customer: customer.id,
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${this.configService.get('FRONTEND_URL')}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${this.configService.get('FRONTEND_URL')}/payment/cancel`,
        metadata: {
          userId: user.id,
        },
      });

      // Create payment record
      const payment = this.paymentRepository.create({
        stripeSessionId: session.id,
        stripeCustomerId: customer.id,
        amount: session.amount_total || 0,
        currency: session.currency || 'eur',
        status: 'pending',
        priceId,
        userId: user.id,
      });

      await this.paymentRepository.save(payment);

      return { sessionId: session.id, url: session.url };
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw new InternalServerErrorException('Error creating checkout session');
    }
  }

  async handleWebhook(signature: string, payload: Buffer) {
    const webhookSecret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET');
    if (!webhookSecret) {
      throw new InternalServerErrorException('Stripe webhook secret not configured');
    }

    try {
      const event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookSecret,
      );

      switch (event.type) {
        case 'checkout.session.completed':
          await this.handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
          break;
        case 'customer.subscription.updated':
          await this.handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
          break;
        case 'customer.subscription.deleted':
          await this.handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
          break;
      }

      return { received: true };
    } catch (error) {
      console.error('Webhook error:', error);
      throw new InternalServerErrorException('Webhook error');
    }
  }

  private async handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
    const payment = await this.paymentRepository.findOne({
      where: { stripeSessionId: session.id },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    payment.status = 'active';
    if (session.subscription) {
      payment.subscriptionId = session.subscription as string;
    }

    await this.paymentRepository.save(payment);
  }

  private async handleSubscriptionUpdated(subscription: Stripe.Subscription) {
    const payment = await this.paymentRepository.findOne({
      where: { subscriptionId: subscription.id },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    payment.status = subscription.status;
    await this.paymentRepository.save(payment);
  }

  private async handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    const payment = await this.paymentRepository.findOne({
      where: { subscriptionId: subscription.id },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    payment.status = 'canceled';
    payment.canceledAt = new Date();
    await this.paymentRepository.save(payment);
  }

  async cancelSubscription(userId: string) {
    const payment = await this.paymentRepository.findOne({
      where: { userId, status: 'active' },
    });

    if (!payment || !payment.subscriptionId) {
      throw new NotFoundException('Active subscription not found');
    }

    try {
      await this.stripe.subscriptions.cancel(payment.subscriptionId);
      payment.status = 'canceled';
      payment.canceledAt = new Date();
      await this.paymentRepository.save(payment);
      
      return { success: true };
    } catch (error) {
      console.error('Error canceling subscription:', error);
      throw new InternalServerErrorException('Error canceling subscription');
    }
  }
} 