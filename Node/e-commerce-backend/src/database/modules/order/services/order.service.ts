import { Repository } from "typeorm";
import { Order } from "../models/order.model.ts";
import { AppDataSource } from "../../../typeorm-cli.ts";
import { UpdateCartDto } from "../../cart/dtos/cart.dto.ts";
import { PlaceOrderDto } from "../dtos/order.dto.ts";
import type { IOrderService } from "./order.interface.ts";
import { Product } from "../../product/models/product.model.ts";

export class OrderService implements IOrderService {
  private orderRepo: Repository<Order>;
  private productRepo: Repository<Product>;

  constructor() {
    this.orderRepo = AppDataSource.getRepository(Order);
    this.productRepo = AppDataSource.getRepository(Product);
  }

  async placeOrder(dto: PlaceOrderDto): Promise<Order> {
    const { userId, productId, quantity, paymentMethod, shippingAddress } = dto;

    if (paymentMethod !== "COD") {
      throw new Error("Only COD payment is supported.");
    }

    const product = await this.productRepo.findOne({ where: { id: productId } });
    if (!product) throw new Error("Product not found");

    if (product.stockQuantity < quantity) {
      throw new Error(`Only ${product.stockQuantity} item(s) available`);
    }

    const order = this.orderRepo.create({
      userId,
      productId,
      quantity,
      totalAmount: product.price * quantity,
      paymentMethod,
      shippingAddress,
      status: "PLACED",
    });

    const savedOrder = await this.orderRepo.save(order);

    product.stockQuantity -= quantity;
    await this.productRepo.save(product);

    return savedOrder;
  }

  async findAll(userId: number, role: string) {
    if (role === "vendor") {
    return this.orderRepo.find({
      where: {
        product: {
          vendorId: userId,   // filter product by vendor
        },
      },
      relations: ["product", "user"],
    });
  }

    // user -> only see their orders
    return this.orderRepo.find({
      where: { userId },
      relations: ["product", "user"],
    });
  }

  async findOne(id: number, userId: number, role: string): Promise<Order | null> {
    if (role === "vendor") {
      return this.orderRepo.findOne({
        where: { id },
        relations: ["product", "user"],
      });
    }

    return this.orderRepo.findOne({
      where: { id, userId },
      relations: ["product", "user"],
    });
  }

  async update(id: number, userId: number, role: string, data: UpdateCartDto): Promise<Order> {
    const order = await this.findOne(id, userId, role);
    if (!order) throw new Error("Order not found or unauthorized");

    Object.assign(order, data);
    return this.orderRepo.save(order);
  }

  async patch(id: number, userId: number, role: string, data: UpdateCartDto): Promise<Order> {
    const order = await this.findOne(id, userId, role);
    if (!order) throw new Error("Order not found or unauthorized");
    
    Object.assign(order, data);
    return this.orderRepo.save(order);
  }

  async delete(id: number, userId: number, role: string): Promise<Order> {
    const order = await this.findOne(id, userId, role);
    if (!order) throw new Error("Order not found or unauthorized");

    await this.orderRepo.delete(id);
    return order;
  }
}
