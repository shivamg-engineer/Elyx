import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsEnum,
  IsPositive,
  IsOptional,
  IsIn,
  MinLength,
  MaxLength,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class PlaceOrderDto {
  @ApiProperty({
    example: "COD",
    description: "Payment method for the order",
    enum: ["COD"],
    default: "COD",
  })
  @IsString()
  @IsIn(["COD"])
  @IsNotEmpty()
  paymentMethod!: string;

  @ApiProperty({
    example: "123 Main Street, New York, NY 10001",
    description: "Shipping address for the order delivery",
    minLength: 5,
    maxLength: 500,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(500)
  shippingAddress!: string;
}

export class UpdateOrderDto {
  @ApiPropertyOptional({
    example: 2,
    description: "Quantity of the product",
  })
  @IsOptional()
  @IsNumber()
  @IsPositive({ message: "Quantity must be a positive number" })
  quantity?: number;

  @ApiPropertyOptional({
    example: "confirmed",
    description: "Order status",
    enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
  })
  @IsOptional()
  @IsString()
  @IsIn(["pending", "confirmed", "shipped", "delivered", "cancelled"], {
    message:
      "Status must be one of: pending, confirmed, shipped, delivered, cancelled",
  })
  status?: string;

  @ApiPropertyOptional({
    example: "COD",
    description: "Payment method",
    enum: ["COD"],
  })
  @IsOptional()
  @IsString()
  @IsIn(["COD"], { message: "Only COD payment method is supported" })
  paymentMethod?: string;

  @ApiPropertyOptional({
    example: "123 Main Street, New York, NY 10001",
    description: "Shipping address",
    minLength: 5,
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(500)
  shippingAddress?: string;
}

export class PatchOrderDto {
  @ApiPropertyOptional({
    example: 2,
    description: "Quantity of the product",
  })
  @IsOptional()
  @IsNumber()
  @IsPositive({ message: "Quantity must be a positive number" })
  quantity?: number;

  @ApiPropertyOptional({
    example: "confirmed",
    description: "Order status",
    enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
  })
  @IsOptional()
  @IsString()
  @IsIn(["pending", "confirmed", "shipped", "delivered", "cancelled"], {
    message:
      "Status must be one of: pending, confirmed, shipped, delivered, cancelled",
  })
  status?: string;

  @ApiPropertyOptional({
    example: "COD",
    description: "Payment method",
    enum: ["COD"],
  })
  @IsOptional()
  @IsString()
  @IsIn(["COD"], { message: "Only COD payment method is supported" })
  paymentMethod?: string;

  @ApiPropertyOptional({
    example: "123 Main Street, New York, NY 10001",
    description: "Shipping address",
    minLength: 5,
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(500)
  shippingAddress?: string;
}

// Response DTOs for better API documentation
export class OrderResponseDto {
  @ApiProperty({ example: 1, description: "Order ID" })
  id!: number;

  @ApiProperty({ example: 1, description: "User ID who placed the order" })
  userId!: number;

  @ApiProperty({ example: 299.99, description: "Total amount of the order" })
  total!: number;

  @ApiProperty({
    example: "pending",
    description: "Order status",
    enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
  })
  status!: string;

  @ApiProperty({
    example: "COD",
    description: "Payment method",
    enum: ["COD"],
  })
  paymentMethod!: string;

  @ApiProperty({
    example: "123 Main Street, New York, NY 10001",
    description: "Shipping address",
  })
  shippingAddress!: string;

  @ApiProperty({
    example: "2024-01-15T10:30:00.000Z",
    description: "Order creation date",
  })
  createdAt!: Date;

  @ApiProperty({
    example: "2024-01-15T10:30:00.000Z",
    description: "Last update date",
  })
  updatedAt!: Date;
}

export class OrderTotalResponseDto {
  @ApiProperty({ example: 1, description: "Order ID" })
  orderId!: number;

  @ApiProperty({ example: 299.99, description: "Total amount of the order" })
  total!: number;

  @ApiProperty({ example: 2, description: "Total number of items" })
  itemCount!: number;
}

export class ApiResponseDto<T> {
  @ApiProperty({
    example: "Order created successfully",
    description: "Response message",
  })
  message!: string;

  @ApiProperty({ description: "Response data" })
  data!: T;
}

export class OrderItemResponseDto {
  @ApiProperty({ example: 1, description: "Order item ID" })
  id!: number;

  @ApiProperty({ example: 1, description: "Product ID" })
  productId!: number;

  @ApiProperty({ example: 2, description: "Quantity of the product" })
  quantity!: number;

  @ApiProperty({ example: 149.99, description: "Price per unit" })
  price!: number;

  @ApiProperty({ example: 299.98, description: "Subtotal for this item" })
  subtotal!: number;
}
