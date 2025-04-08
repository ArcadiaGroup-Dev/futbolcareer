import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class SubscriptionService {
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-02-24.acacia',
  });

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createSubscription(userId: string, planId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const subscription = await this.stripe.subscriptions.create({
      customer: user.stripeCustomerId,
      items: [{ price: planId }],
    });
    user.subscriptionId = subscription.id;
    user.subscriptionStatus = subscription.status;
    await this.userRepository.save(user);
    return subscription;
  }

  async updateSubscription(userId: string, newPlanId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const current = await this.stripe.subscriptions.retrieve(user.subscriptionId);
    const updated = await this.stripe.subscriptions.update(user.subscriptionId, {
      items: [{
        id: current.items.data[0].id,
        price: newPlanId,
      }],
    });
    user.subscriptionStatus = updated.status;
    await this.userRepository.save(user);
    return updated;
  }

  async cancelSubscription(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const canceled = await this.stripe.subscriptions.cancel(user.subscriptionId);
    user.subscriptionStatus = 'canceled';
    await this.userRepository.save(user);
    return canceled;
  }

  async getActiveSubscription(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const subscription = await this.stripe.subscriptions.retrieve(user.subscriptionId);
    return {
      id: subscription.id,
      status: subscription.status,
      plan: subscription.items.data[0].price.nickname,
      current_period_end: subscription.current_period_end,
    };
  }

  async checkSubscriptionStatus(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const subscription = await this.stripe.subscriptions.retrieve(user.subscriptionId);
    return {
      isSubscribed: subscription.status === 'active',
      subscriptionStatus: subscription.status,
      plan: subscription.items.data[0].price.nickname,
      badge: subscription.status === 'active' ? '👑 Premium User' : null,
    };
  }
}
