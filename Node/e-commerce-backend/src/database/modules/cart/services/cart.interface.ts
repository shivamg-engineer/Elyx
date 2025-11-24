import { AddToCartDto,UpdateCartDto,PatchCartDto } from "../dtos/cart.dto";
import { Cart } from "../models/cart.model";


export interface ICartService {
  addOrUpdate(data: AddToCartDto): Promise<Cart>;
  findAll(userId: number): Promise<Cart[]>;
  findOne(id: number): Promise<Cart | null>;
  update(id: number, dto: UpdateCartDto): Promise<Cart>;
  patch(id: number, userId: number, dto: PatchCartDto): Promise<Cart>;
  softDelete(id: number, userId: number): Promise<Cart>;
}
