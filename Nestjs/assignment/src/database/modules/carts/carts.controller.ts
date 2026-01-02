import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
// import type { UserAuthRequest } from '../';
import {
  AddToCartDto,
  AddToCartResponseDto,
  CartResponseDto,
  CartItemRemovedResponseDto,
  CartClearedResponseDto,
} from "./dto/add-to-cart.dto";
import { Cart } from "./carts.entity";
import { CartsService } from "./carts.service";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/common/guards/roles.guard";
import { Roles } from "src/common/decorators/roles.decorators";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { Throttle } from "@nestjs/throttler";

@ApiTags("Carts")
@Controller("carts")
@UseGuards(RolesGuard)
@Roles("user")
@ApiBearerAuth()
export class CartsController {
  constructor(private readonly cartService: CartsService) {}

  //add to cart
  @UseGuards(AuthGuard("user-jwt"))
  @Throttle({ default: { limit: 30, ttl: 60000 } })
  @Post()
  @ApiOperation({
    summary: "Add item to cart",
    description:
      "Adds a product to the authenticated user's cart. If the product already exists in the cart, the quantity will be updated.",
  })
  @ApiResponse({
    status: 201,
    description: "Item added to cart successfully",
    type: AddToCartResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - Invalid or missing JWT token",
  })
  @ApiResponse({
    status: 404,
    description: "Product not found",
  })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid input data or product unavailable",
  })
  @ApiBody({ type: AddToCartDto })
  async addToCart(@Req() req, @Body() body: AddToCartDto): Promise<Cart> {
    return await this.cartService.addToCart(
      req.user.sub,
      body.productId,
      body.quantity
    );
  }

  //view cart
  @UseGuards(AuthGuard("user-jwt"))
  @Throttle({ default: { limit: 50, ttl: 60000 } })
  @Get()
  @ApiOperation({
    summary: "Get user's cart",
    description:
      "Retrieves the authenticated user's cart with all items, quantities, and total amount",
  })
  @ApiResponse({
    status: 200,
    description: "Cart retrieved successfully",
    type: CartResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - Invalid or missing JWT token",
  })
  @ApiResponse({
    status: 404,
    description: "User not found or cart is empty",
  })
  getMyCart(@Req() req) {
    console.log(req.user.sub);
    if (req.user.sub === undefined) {
      return new NotFoundException("User not Found or it may be undefined");
    }
    return this.cartService.getUserCart(req.user.sub);
  }

  //removeCartItem
  @UseGuards(AuthGuard("user-jwt"))
  @Throttle({ default: { limit: 20, ttl: 60000 } })
  @Delete("item/:id")
  @ApiOperation({
    summary: "Remove item from cart",
    description:
      "Removes a specific item from the authenticated user's cart using the cart item ID",
  })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Unique identifier of the cart item to remove",
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: "Item removed from cart successfully",
    type: CartItemRemovedResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - Invalid or missing JWT token",
  })
  @ApiResponse({
    status: 404,
    description: "Cart item not found or does not belong to user",
  })
  async removeItem(@Param("id") cartId: number, @Req() req) {
    return this.cartService.removeCartItem(cartId, req.user.sub);
  }

  //clear cart
  @UseGuards(AuthGuard("user-jwt"))
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Delete("clear")
  @ApiOperation({
    summary: "Clear entire cart",
    description:
      "Removes all items from the authenticated user's cart. This action cannot be undone.",
  })
  @ApiResponse({
    status: 200,
    description: "Cart cleared successfully",
    type: CartClearedResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - Invalid or missing JWT token",
  })
  @ApiResponse({
    status: 404,
    description: "User not found or cart is already empty",
  })
  async clearCart(@Req() req) {
    return this.cartService.clearCart(req.user.sub);
  }
}
