import { IsNull, Repository } from "typeorm";
import { AppDataSource } from "../../../typeorm-cli.ts";
import { AddToCartDto, UpdateCartDto, PatchCartDto } from "../dtos/cart.dto.ts";
import { Cart } from "../models/cart.model.ts";
import { Product } from "../../product/models/product.model.ts";
import type { ICartService } from "./cart.interface.ts";

export class CartService implements ICartService {
  private cartRepo: Repository<Cart>;
  private productRepo: Repository<Product>;

  constructor() {
    this.cartRepo = AppDataSource.getRepository(Cart);
    this.productRepo = AppDataSource.getRepository(Product);
  }

  // ADD or UPDATE cart item
  async addOrUpdate(data: AddToCartDto): Promise<Cart> {
    const { userId, productId, quantity } = data;

    // Check if product exists
    const product = await this.productRepo.findOneBy({ id: productId });
    if (!product) throw new Error("Product not found");

    let existing = await this.cartRepo.findOne({
      where: { userId, productId, deletedAt: IsNull() },
    });

    // If exists → update quantity
    if (existing) {
      existing.quantity += quantity;
      return await this.cartRepo.save(existing);
    }

    // Create new cart item
    const cart = this.cartRepo.create({
      userId,
      productId,
      quantity,
      paymentMethod: data.paymentMethod,
      isAbandoned: data.isAbandoned ?? false,
    });

    return await this.cartRepo.save(cart);
  }

  async findAll(userId: number): Promise<Cart[]> {
    return this.cartRepo.find({
      where: { userId, deletedAt: IsNull() },
      relations: ["product"], // if needed
    });
  }

  async findOne(id: number): Promise<Cart | null> {
    return this.cartRepo.findOneBy({ id });
  }

  async update(id: number, dto: UpdateCartDto): Promise<Cart> {
    const cart = await this.cartRepo.findOneBy({ id });
    if (!cart) throw new Error("cart not found");

    Object.assign(cart, dto);
    return this.cartRepo.save(cart);
  }

  async patch(id: number, userId: number, dto: PatchCartDto): Promise<Cart> {
    const cart = await this.cartRepo.findOne({
      where: { id, userId, deletedAt: IsNull() },
    });

    if (!cart) throw new Error("Cart not found");
    Object.assign(cart, dto);

    return this.cartRepo.save(cart);
  }

  // Soft delete
  async softDelete(id: number, userId: number): Promise<Cart> {
    const cart = await this.cartRepo.findOne({
      where: { id, userId, deletedAt: IsNull() },
    });
    if (!cart) throw new Error("Cart not found");

    await this.cartRepo.softDelete(id); // uses deletedAt column
    return cart;
  }
}
