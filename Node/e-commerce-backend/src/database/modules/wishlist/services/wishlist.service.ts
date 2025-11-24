import { Repository } from "typeorm";
import { Wishlist } from "../models/wishlist.model.ts";
import { AppDataSource } from "../../../typeorm-cli.ts";
import { CreateWishlistDto, UpdateWishlistDto } from "../dtos/wishlist.dto.ts";
import type { IWishlistService } from "./wishlist.interface.ts";
import { Product } from "../../product/models/product.model.ts";

export class WishlistService implements IWishlistService {
  private wishlistRepo: Repository<Wishlist>;
  private productRepo:Repository<Product>;

  constructor() {
    this.wishlistRepo = AppDataSource.getRepository(Wishlist);
    this.productRepo=AppDataSource.getRepository(Product);
  }

  async add(userId: number, productId: number): Promise<Wishlist> {
    const product = await this.productRepo.findOne({ where: { id: productId } });
    if (!product) throw new Error("Product not found");

     // Prevent duplicate entries
    const existing = await this.wishlistRepo.findOne({
      where: { user: { id: userId }, product: { id: productId } },
    });

    if (existing) throw new Error("Product already in wishlist");

     const wishlist = this.wishlistRepo.create({
      user: { id: userId } as any,
      product: { id: productId } as any,
    });

    return this.wishlistRepo.save(wishlist);
  }

  // View wishlist
  async findAll(userId: number) {
    return this.wishlistRepo.find({
      where: { user: { id: userId } },
      relations: ["product"],
    });
  }

  findOne(id: number): Promise<Wishlist | null> {
    return this.wishlistRepo.findOne({
      where: { id },
      relations: ["product", "user"],
    });
  }

  async update(id: number, data: UpdateWishlistDto): Promise<Wishlist> {
    const wishlist = await this.wishlistRepo.findOneBy({ id });
    if (!wishlist) throw new Error("Wishlist not found");
    Object.assign(wishlist, data);
    return this.wishlistRepo.save(wishlist);
  }
  

    // Remove from wishlist
  async remove(userId: number, productId: number) {
    const wishlist = await this.wishlistRepo.findOne({
      where: { user: { id: userId }, product: { id: productId } },
    });

    if (!wishlist) throw new Error("Product not in wishlist");

    await this.wishlistRepo.remove(wishlist);
    return { message: "Removed from wishlist" };
  }
}
