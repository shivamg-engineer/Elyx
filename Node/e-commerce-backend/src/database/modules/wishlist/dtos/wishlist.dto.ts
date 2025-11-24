import { IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class CreateWishlistDto {
  @IsInt()
  @IsNotEmpty()
  userId!: number;

  @IsInt()
  @IsNotEmpty()
  productId!: number;
}

export class UpdateWishlistDto {
  @IsOptional()
  @IsInt()
  userId?: number;

  @IsOptional()
  @IsInt()
  productId?: number;
}