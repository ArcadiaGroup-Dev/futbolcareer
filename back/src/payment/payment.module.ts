import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { Payment } from './entities/payment.entity';
import { UserModule } from '../modules/user/user.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Payment]),
    UserModule
  ],
  providers: [PaymentService],
  controllers: [PaymentController],
  exports: [PaymentService]
})
export class PaymentModule {} 