import { Controller, Post, Body, Headers, Req, UseGuards, Get, Param } from '@nestjs/common';
import { Request } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { AuthGuard } from '../modules/auth/auth.guard';
import { GetUser } from '../decorator/get-user.decorator';
import { User } from '../modules/user/entities/user.entity';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-checkout-session')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a Stripe checkout session' })
  @ApiResponse({ status: 200, description: 'Checkout session created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async createCheckoutSession(
    @GetUser() user: User,
    @Body('priceId') priceId: string,
  ) {
    return this.paymentService.createCheckoutSession(user, priceId);
  }

  @Post('webhook')
  @ApiOperation({ summary: 'Handle Stripe webhooks' })
  @ApiResponse({ status: 200, description: 'Webhook handled successfully' })
  @ApiResponse({ status: 400, description: 'Invalid webhook signature' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async handleWebhook(
    @Headers('stripe-signature') signature: string,
    @Req() request: Request,
  ) {
    return this.paymentService.handleWebhook(signature, request.body as Buffer);
  }

  @Post('cancel-subscription')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cancel user subscription' })
  @ApiResponse({ status: 200, description: 'Subscription canceled successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Active subscription not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async cancelSubscription(@GetUser() user: User) {
    return this.paymentService.cancelSubscription(user.id);
  }
} 