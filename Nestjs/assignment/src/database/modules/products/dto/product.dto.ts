import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsString,
  IsNumber,
  IsPositive,
  IsOptional,
  IsUrl,
  IsNotEmpty,
  Min,
  Max,
  MinLength,
  IsInt,
  isInt,
  IsNumberString,
} from "class-validator";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty({ example: "Gaming Mouse" })
  name!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "Gaming Mouse" })
  description!: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ example: 1499 })
  price!: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @Min(1)
  @ApiProperty({ example: 50 })
  stockQuantity!: number;

  @IsString()
  @ApiProperty({ example: 50 })
  category!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 50 })
  imageUrl!: string;
}

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  stockQuantity?: number;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
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

export class VendorResponseDto {
  id!: number;
  name!: string;
  email!: string;
  phone!: string;
  store_name!: string;
  gstin!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export class ProductFilterDto {
  @ApiPropertyOptional({ example: "mouse" })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ example: "Electronics" })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: 500 })
  @IsOptional()
  @IsNumberString()
  minPrice?: string;

  @ApiPropertyOptional({ example: 2000 })
  @IsOptional()
  @IsNumberString()
  maxPrice?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsNumberString()
  limit?: string;

  @ApiPropertyOptional({ example: "price:ASC" })
  @IsOptional()
  @IsString()
  sort?: string;
}
