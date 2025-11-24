import { IsBoolean, IsInt, Min, IsOptional, IsString,Matches } from "class-validator";


export class AddToCartDto {
  @IsInt()
  userId!: number;

  @IsInt()
  productId!: number;

  @IsInt()
  @Min(1)
  quantity!: number;

  @IsString()
  @Matches(/^(COD)$/i, {
    message: "paymentMethod must be 'COD' only",
  })
  paymentMethod!: string;

  @IsOptional()
  @IsBoolean()
  isAbandoned?: boolean;
}

export class UpdateCartDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  quantity?: number;

  @IsOptional()
  @IsBoolean()
  isAbandoned?: boolean;
}

export class PatchCartDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  quantity?: number;

  

  @IsOptional()
  @IsBoolean()
  isAbandoned?: boolean;
}