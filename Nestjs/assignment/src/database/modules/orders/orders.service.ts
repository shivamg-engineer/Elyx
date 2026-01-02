import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  Logger,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DataSource } from "typeorm";
import { Order } from "./orders.entity";
import { OrderItem } from "./order-item.entity";
import { CartsService } from "../carts/carts.service";
import { PlaceOrderDto, UpdateOrderDto } from "./dto/order.dto";

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepo: Repository<OrderItem>,
    private cartService: CartsService,
    private dataSource: DataSource
  ) {}

  async placeOrder(userId: number, dto: PlaceOrderDto): Promise<Order> {
    this.logger.log(`Starting order placement for user ${userId}`);

    // 🛑 Basic input validation
    if (!dto.shippingAddress?.trim()) {
      throw new BadRequestException("Shipping address is required");
    }
    if (dto.paymentMethod !== "COD") {
      throw new BadRequestException("Only COD payment method is supported");
    }

    // 🛒 Fetch cart
    const cartItems = await this.cartService.getUserCart(userId);
    this.logger.log(`Cart Items: ${cartItems.length}`);

    if (!cartItems.length) throw new NotFoundException("Cart is empty!");

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      let totalAmount = 0;

      // 📌 Create empty order first — items will be added later
      const order = queryRunner.manager.create(Order, {
        user: { id: userId } as any,
        shippingAddress: dto.shippingAddress.trim(),
        paymentMethod: dto.paymentMethod,
        status: "pending",
        total: 0,
      });

      const savedOrder = await queryRunner.manager.save(order);
      this.logger.log(`Order created: ${savedOrder.id}`);

      // 🧩 Process each cart item into an order item
      for (const cart of cartItems) {
        const product = cart.product;

        // 🛑 Stock validation
        if (product.stockQuantity < cart.quantity) {
          throw new ForbiddenException(
            `${product.name} has only ${product.stockQuantity} left in stock`
          );
        }

        // 🔻 Reduce stock
        product.stockQuantity -= cart.quantity;
        await queryRunner.manager.save(product);

        const itemSubtotal = Number(product.price) * cart.quantity;
        totalAmount += itemSubtotal;

        const orderItem = queryRunner.manager.create(OrderItem, {
          order: { id: savedOrder.id } as any,
          product: { id: product.id } as any,
          quantity: cart.quantity,
          price: product.price,
          subtotal: itemSubtotal,
        });

        await queryRunner.manager.save(orderItem);

        this.logger.log(
          `Order item added: Product ${product.id} x ${cart.quantity}`
        );
      }

      // 💰 Update final order total
      savedOrder.total = totalAmount;
      await queryRunner.manager.save(savedOrder);

      await queryRunner.commitTransaction();
      this.logger.log(
        `Order ${savedOrder.id} completed. Total = ${totalAmount}`
      );

      // 🧹 Clear cart AFTER transaction success
      await this.cartService.clearCart(userId);

      // 🎯 Load full final order with relations
      const finalOrder = await this.orderRepo.findOne({
        where: { id: savedOrder.id },
        relations: ["items", "items.product", "user"],
      });

      return finalOrder!;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error(`Order failed: ${error.message}`);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getAllOrders(userId: number): Promise<Order[]> {
    return await this.orderRepo.find({
      where: { user: { id: userId } },
      relations: ["items", "items.product", "user"],
      order: { createdAt: "DESC" },
      select: {
        user: {
          id: true,
          email: true,
          name: true,
          phone: true,
          address: true,
          // password not selected ❌
        },
      },
    });
  }

  async getOrderById(id: number, userId: number): Promise<Order> {
    const order = await this.orderRepo.findOne({
      where: { id, user: { id: userId } },
      relations: ["items", "items.product", "user"],
    });

    if (!order) {
      throw new NotFoundException("Order not found");
    }

    return order;
  }

  async updateOrder(
    id: number,
    userId: number,
    dto: UpdateOrderDto
  ): Promise<Order> {
    const order = await this.getOrderById(id, userId);

    // Update only provided fields
    if (dto.status !== undefined) {
      order.status = dto.status;
    }

    if (dto.paymentMethod !== undefined) {
      order.paymentMethod = dto.paymentMethod;
    }

    if (dto.shippingAddress !== undefined) {
      order.shippingAddress = dto.shippingAddress;
    }

    return await this.orderRepo.save(order);
  }

  async deleteOrder(id: number, userId: number): Promise<{ message: string }> {
    const order = await this.getOrderById(id, userId);

    // Only allow deletion of pending orders
    if (order.status !== "pending") {
      throw new ForbiddenException(
        "Cannot delete order that is not in pending status"
      );
    }

    await this.orderRepo.delete(id);

    return { message: "Order deleted successfully" };
  }

  async getOrderTotal(id: number, userId: number): Promise<{ total: number }> {
    const order = await this.getOrderById(id, userId);

    return {
      total: Number(order.total),
    };
  }
}
