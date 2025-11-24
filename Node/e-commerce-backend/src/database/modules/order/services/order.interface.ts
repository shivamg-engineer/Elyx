import { Order } from "../models/order.model.ts";
import { PlaceOrderDto, UpdateOrderDto } from "../dtos/order.dto.ts";

export interface IOrderService {
  placeOrder(dto: PlaceOrderDto): Promise<Order>;
  findAll(userId: number, role: string): Promise<Order[]>;
  findOne(id: number, userId: number, role: string): Promise<Order | null>;
  update(id: number, userId: number, role: string, data: UpdateOrderDto): Promise<Order>;
  patch(id: number, userId: number, role: string, data: UpdateOrderDto): Promise<Order>;
  delete(id: number, userId: number, role: string): Promise<Order>;
}
