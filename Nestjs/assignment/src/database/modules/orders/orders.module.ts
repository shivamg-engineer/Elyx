import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { Order } from "./orders.entity";
import { OrderItem } from "./order-item.entity";
import { CartsService } from "../carts/carts.service";
import { CartsController } from "../carts/carts.controller";
import { CartsModule } from "../carts/carts.module";

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem]), CartsModule],
  providers: [OrdersService],
  controllers: [OrdersController],
  exports: [OrdersService, TypeOrmModule],
})
export class OrdersModule {}
