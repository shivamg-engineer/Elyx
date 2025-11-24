import { IsNotEmpty, IsNumber, IsString, IsEnum, IsPositive,IsOptional,IsIn } from "class-validator";

export class PlaceOrderDto {
  @IsNumber()
  @IsPositive()
  userId!: number;

  @IsNumber()
  @IsPositive()
  productId!: number;

  @IsNumber()
  @IsPositive()
  quantity!: number;

  @IsString()
  @IsIn(["COD"])
  paymentMethod!: string;

  @IsString()
  @IsNotEmpty()
  shippingAddress!: string;
}

export class UpdateOrderDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  quantity?: number;

  @IsOptional()
  @IsString()
  @IsIn(["pending", "confirmed", "shipped", "delivered", "cancelled"])
  status?: string;

  @IsOptional()
  @IsString()
  paymentMethod?: string;

  @IsOptional()
  @IsString()
  shippingAddress?: string;
}

export class PatchOrderDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  quantity?: number;

  @IsOptional()
  @IsString()
  @IsIn(["pending", "confirmed", "shipped", "delivered", "cancelled"])
  status?: string;

  @IsOptional()
  @IsString()
  paymentMethod?: string;

  @IsOptional()
  @IsString()
  shippingAddress?: string;
}

