import { Repository } from "typeorm";
import { Cart } from "./carts.entity";
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CartsService {
  private readonly logger = new Logger(CartsService.name);

  constructor(
    @InjectRepository(Cart)
    private readonly cartRepo: Repository<Cart>
  ) {}

  async addToCart(
    userId: number,
    productId: number,
    quantity: number
  ): Promise<Cart> {
    this.logger.log(
      `Adding to cart - User: ${userId}, Product: ${productId}, Quantity: ${quantity}`
    );

    // Validate inputs
    if (!userId || userId <= 0) {
      throw new BadRequestException("Valid user ID is required");
    }

    if (!productId || productId <= 0) {
      throw new BadRequestException("Valid product ID is required");
    }

    if (!quantity || quantity <= 0) {
      throw new BadRequestException("Quantity must be a positive number");
    }

    if (quantity > 100) {
      throw new BadRequestException(
        "Quantity cannot exceed 100 items per product"
      );
    }

    // Check if cart item already exists
    const existing = await this.cartRepo.findOne({
      where: { user: { id: userId }, product: { id: productId } },
    });

    if (existing) {
      const newQuantity = existing.quantity + quantity;
      if (newQuantity > 100) {
        throw new BadRequestException(
          "Total quantity cannot exceed 100 items per product"
        );
      }

      existing.quantity = newQuantity;
      existing.paymentMethod = existing.paymentMethod || "COD";
      this.logger.log(
        `Updated existing cart item - New quantity: ${newQuantity}`
      );
      return await this.cartRepo.save(existing);
    }

    // Create new entry
    const cart = this.cartRepo.create({
      user: { id: userId } as any,
      product: { id: productId } as any,
      quantity,
      paymentMethod: "COD",
    });

    const savedCart = await this.cartRepo.save(cart);
    this.logger.log(`Created new cart item with ID: ${savedCart.id}`);
    return savedCart;
  }

  async getUserCart(userId: number) {
    if (!userId || userId <= 0) {
      throw new BadRequestException("Valid user ID is required");
    }

    this.logger.log(`Retrieving cart for user: ${userId}`);

    const cartItems = await this.cartRepo.find({
      where: { user: { id: userId } },
      relations: ["product"],
    });

    // Validate cart items
    for (const item of cartItems) {
      if (!item.product) {
        this.logger.warn(`Cart item ${item.id} has no associated product`);
        continue;
      }

      if (item.quantity <= 0) {
        this.logger.warn(
          `Cart item ${item.id} has invalid quantity: ${item.quantity}`
        );
      }

      if (!item.product.price || Number(item.product.price) <= 0) {
        this.logger.warn(
          `Product ${item.product.id} has invalid price: ${item.product.price}`
        );
      }
    }

    this.logger.log(
      `Found ${cartItems.length} items in cart for user ${userId}`
    );
    return cartItems;
  }

  async removeCartItem(cartId: number, userId: number) {
    const item = await this.cartRepo.findOne({
      where: { id: cartId, user: { id: userId } },
    });

    if (!item) {
      throw new ForbiddenException("Item does not exists!");
    }

    await this.cartRepo.delete(cartId);
    return { message: "Item removed from cart" };
  }

  async clearCart(userId: number) {
    await this.cartRepo.delete({ user: { id: userId } });
    return { message: "Cart cleared" };
  }
}
