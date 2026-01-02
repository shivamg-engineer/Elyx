import { Module } from '@nestjs/common';
import { PaymentProvider } from './payment.provider';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [LoggerModule.register({})],
  providers: [PaymentProvider, PaymentService],
  controllers: [PaymentController],
  exports: [PaymentService],
})
export class PaymentModule {}
