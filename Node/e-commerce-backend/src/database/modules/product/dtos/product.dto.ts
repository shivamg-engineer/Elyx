import { IsString, IsNumber, IsPositive,IsOptional ,IsUrl, IsNotEmpty, Min,Max} from "class-validator";
import { Trim,ToLower,EscapeHTML } from "../../../../auth/sanitize.ts";

export class CreateProductDto {


    @IsString()
    @IsNotEmpty()
    @Min(2)
    @Trim()
    @EscapeHTML()
    name!: string;

    @IsString()
    @Trim()
    description!: string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    price!: number;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @Min(1)
    stockQuantity!: number;

    @IsString()
    @Trim()
    category!: string;

    @IsString()
    @IsNotEmpty()
    imageUrl!: string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    vendorId!: number; // Many-to-One (product belongs to vendor)
}

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @Trim()
  @EscapeHTML()
  name?: string;

  @IsOptional()
  @IsString()
  @Trim()
  description?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  stockQuantity?: number;

  @IsOptional()
  @IsString()
  @Trim()
  category?: string;

  @IsOptional()
  @IsUrl()
  @Trim()
  imageUrl?: string;

  @IsOptional()
  @IsNumber()
  vendorId?: number; 
}

export class ProductResponseDto {
  id!: number;
  name!: string;
  description!: string;
  price!: number;
  stockQuantity!: number;
  category!: string;
  imageUrl!: string;
  vendorId!: number;
}
