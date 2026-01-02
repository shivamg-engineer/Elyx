import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { ProductsModule } from './products/products.module';
import { CustomProvider } from './custom/custom.provider';
import { CustomTestController } from './custom-test/custom-test.controller';
// import { OrdersModule } from './orders/orders.module';

import { LazyController } from './lazy/lazy.controller';
import { LazyLoaderService } from "./lazy/lazy-loader.service";
import { UsersModule } from './users/users.module';
import { PaymentModule } from './payment/payment.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [UsersModule, PaymentModule,
    // LoggerModule.register({
    //   prefix: 'PAYMENT',
    // }),
    ],
  controllers: [AppController,CustomTestController, LazyController],
  providers: [AppService, CustomProvider, LazyLoaderService],
})
export class AppModule {}

//exercise 1 -> http://localhost:3000/payment
//exercise 4 -> http://localhost:3000/users
//exercise 5 -> onApplicationShutdown [completed]