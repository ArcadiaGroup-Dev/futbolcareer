import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post('create')
  create(@Body() body: { userId: string; planId: string }) {
    return this.subscriptionService.createSubscription(body.userId, body.planId);
  }

  @Post('update')
  update(@Body() body: { userId: string; newPlanId: string }) {
    return this.subscriptionService.updateSubscription(body.userId, body.newPlanId);
  }

  @Post('cancel')
  cancel(@Body() body: { userId: string }) {
    return this.subscriptionService.cancelSubscription(body.userId);
  }

  @Get('active/:userId')
  getActive(@Param('userId') userId: string) {
    return this.subscriptionService.getActiveSubscription(userId);
  }

  @Get('status/:userId')
  checkStatus(@Param('userId') userId: string) {
    return this.subscriptionService.checkSubscriptionStatus(userId);
  }
}