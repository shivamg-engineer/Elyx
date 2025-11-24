import { Wishlist } from "../models/wishlist.model.ts";
import { CreateWishlistDto, UpdateWishlistDto } from "../dtos/wishlist.dto.ts";

export interface IWishlistService {
  add(userId: number, productId: number): Promise<Wishlist>;
  findAll(userId: number): Promise<Wishlist[]>;
  findOne(id: number): Promise<Wishlist | null>;
  update(id: number, dto: UpdateWishlistDto): Promise<Wishlist>;
   remove(userId: number, productId: number): Promise<{ message: string }>;
}
