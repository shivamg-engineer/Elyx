import { IsInt, Min } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class AddToCartDto {
  @ApiProperty({
    example: 1,
    description: "Unique identifier of the product to add to cart",
    type: Number,
  })
  @IsInt()
  productId!: number;

  @ApiProperty({
    example: 2,
    description: "Quantity of the product to add (must be at least 1)",
    type: Number,
    minimum: 1,
    default: 1,
  })
  @IsInt()
  @Min(1)
  quantity!: number;
}

// Response DTOs for better API documentation
export class ProductResponseDto {
  @ApiProperty({ example: 1, description: "Product ID" })
  id!: number;

  @ApiProperty({ example: "Smartphone", description: "Product name" })
  name!: string;

  @ApiProperty({ example: 299.99, description: "Product price" })
  price!: number;

  @ApiProperty({
    example: "https://example.com/images/product.jpg",
    description: "Product image URL",
  })
  image!: string;

  @ApiProperty({ example: "Electronics", description: "Product category" })
  category!: string;
}

export class CartItemResponseDto {
  @ApiProperty({ example: 1, description: "Cart item ID" })
  id!: number;

  @ApiProperty({ description: "Product details", type: ProductResponseDto })
  product!: ProductResponseDto;

  @ApiProperty({ example: 2, description: "Quantity of the product in cart" })
  quantity!: number;

  @ApiProperty({ example: "COD", description: "Payment method" })
  paymentMethod!: string;

  @ApiProperty({
    example: "2024-01-15T10:30:00.000Z",
    description: "Date when item was added to cart",
  })
  addedAt!: Date;
}

export class CartResponseDto {
  @ApiProperty({
    example: 1,
    description: "Unique identifier of the cart",
  })
  id!: number;

  @ApiProperty({
    example: 1,
    description: "User ID who owns this cart",
  })
  userId!: number;

  @ApiProperty({
    type: [CartItemResponseDto],
    description: "List of items in the cart",
  })
  items!: CartItemResponseDto[];

  @ApiProperty({
    example: 599.98,
    description: "Total amount of all items in cart",
  })
  total!: number;

  @ApiProperty({
    example: 3,
    description: "Total number of items in cart",
  })
  itemCount!: number;

  @ApiProperty({
    example: "2024-01-15T10:30:00.000Z",
    description: "Cart creation date",
  })
  createdAt!: Date;

  @ApiProperty({
    example: "2024-01-15T10:30:00.000Z",
    description: "Last cart update date",
  })
  updatedAt!: Date;
}

export class AddToCartResponseDto {
  @ApiProperty({
    example: "Item added to cart successfully",
    description: "Response message",
  })
  message!: string;

  @ApiProperty({
    description: "Updated cart details",
    type: CartResponseDto,
  })
  data!: CartResponseDto;
}

export class CartItemRemovedResponseDto {
  @ApiProperty({
    example: "Item removed from cart successfully",
    description: "Response message",
  })
  message!: string;

  @ApiProperty({
    example: "Item with ID 1 has been removed from your cart",
    description: "Details about the removed item",
  })
  details!: string;
}

export class CartClearedResponseDto {
  @ApiProperty({
    example: "Cart cleared successfully",
    description: "Response message",
  })
  message!: string;

  @ApiProperty({
    example: "All items have been removed from your cart",
    description: "Confirmation details",
  })
  details!: string;
}

export class ApiResponseDto<T> {
  @ApiProperty({
    example: "Success",
    description: "Response message",
  })
  message!: string;

  @ApiProperty({ description: "Response data" })
  data!: T;
}
