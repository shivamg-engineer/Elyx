import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Wishlist } from "./wishlist.entity";
import { Repository } from "typeorm";

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepo: Repository<Wishlist>
  ) {}

  async addToWishlist(userId: number, productId: number) {
    const exists = await this.wishlistRepo.findOne({
      where: { user: { id: userId }, product: { id: productId } },
    });

    if (exists) {
      throw new ForbiddenException("Product already in wishlist");
    }

    const data = this.wishlistRepo.create({
      user: { id: userId },
      product: { id: productId },
    });
    return await this.wishlistRepo.save(data);
  }

  async getMyWishlist(userId: number) {
    return await this.wishlistRepo.find({
      where: { user: { id: userId } },
      relations: ["product"],
      order: { createdAt: "DESC" },
    });
  }

  async removeItem(wishlistId: number, userId: number) {
    const item = await this.wishlistRepo.findOne({
      where: { id: wishlistId, user: { id: userId } },
    });

    if (!item) {
      throw new NotFoundException("Wishlist item not found");
    }

    await this.wishlistRepo.delete(wishlistId);
    return { message: "Item removed from wishlist" };
  }
}
