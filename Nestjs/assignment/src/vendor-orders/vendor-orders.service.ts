import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderItem } from "src/database/modules/orders/order-item.entity";
import { Repository } from "typeorm";

@Injectable()
export class VendorOrdersService {
  constructor(
    @InjectRepository(OrderItem)
    private orderItemRepo: Repository<OrderItem>
  ) {}

  async getVendorOrders(vendorId: number) {
    return this.orderItemRepo.find({
      where: {
        product: {
          vendorId, // filter orders by vendor-owned products
        },
      },
      relations: ["order", "order.user", "product"], // join details
      order: {
        id: "DESC",
      },
    });
  }
}
