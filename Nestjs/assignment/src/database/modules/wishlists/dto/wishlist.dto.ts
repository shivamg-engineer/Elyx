import { ApiProperty } from "@nestjs/swagger";
import { ProductResponseDto } from "../../products/dto/product.dto";

export class WishlistResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ type: ProductResponseDto })
  product!: ProductResponseDto;

  @ApiProperty({ example: "2023-10-01T12:00:00Z" })
  createdAt!: Date;
}

export class AddToWishlistDto {
  @ApiProperty({ example: 1, description: "Product ID to add to wishlist" })
  productId!: number;
}

export class RemoveWishlistItemDto {
  @ApiProperty({ example: 1, description: "Wishlist item ID to remove" })
  id!: number;
}
