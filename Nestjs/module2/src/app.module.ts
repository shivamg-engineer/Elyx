import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { ProductsModule } from './products/products.module';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';


@Module({
  imports: [UsersModule, ProductsModule],
  controllers: [AppController, UsersController,ProductsController],
  providers: [AppService,ProductsService],
})
export class AppModule {}
