import { Module } from "@nestjs/common";
import { VendorOrdersService } from "./vendor-orders.service";
import { VendorOrdersController } from "./vendor-orders.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderItem } from "src/database/modules/orders/order-item.entity";

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem])],
  controllers: [VendorOrdersController],
  providers: [VendorOrdersService],
})
export class VendorOrdersModule {}
