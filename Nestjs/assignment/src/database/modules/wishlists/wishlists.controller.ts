import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from "@nestjs/swagger";
import { WishlistsService } from "./wishlists.service";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/common/guards/roles.guard";
import { Roles } from "src/common/decorators/roles.decorators";
import { WishlistResponseDto } from "./dto/wishlist.dto";
import { Throttle } from "@nestjs/throttler";

@ApiTags("Wishlists")
@Controller("wishlists")
export class WishlistsController {
  constructor(private wishlistService: WishlistsService) {}

  @Throttle({ default: { limit: 30, ttl: 60000 } })
  @ApiBearerAuth()
  @UseGuards(AuthGuard("user-jwt"), RolesGuard)
  @Roles("user")
  @Post(":productId")
  addToWishlist(@Param("productId") productId: number, @Req() req) {
    return this.wishlistService.addToWishlist(req.user.sub, productId);
  }

  @Throttle({ default: { limit: 50, ttl: 60000 } })
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get user's wishlist" })
  @ApiResponse({
    status: 200,
    description: "Wishlist retrieved successfully",
    type: [WishlistResponseDto],
  })
  @UseGuards(AuthGuard("user-jwt"), RolesGuard)
  @Roles("user")
  @Get()
  getMyWishlist(@Req() req) {
    return this.wishlistService.getMyWishlist(req.user.sub);
  }

  @Throttle({ default: { limit: 20, ttl: 60000 } })
  @ApiBearerAuth()
  @ApiOperation({ summary: "Remove item from wishlist" })
  @ApiParam({ name: "id", description: "ID of the wishlist item to remove" })
  @ApiResponse({
    status: 200,
    description: "Item removed from wishlist successfully",
  })
  @ApiResponse({
    status: 404,
    description: "Wishlist item not found",
  })
  @UseGuards(AuthGuard("user-jwt"), RolesGuard)
  @Roles("user")
  @Delete(":id")
  removeWishlistItem(@Param("id") id: number, @Req() req) {
    return this.wishlistService.removeItem(id, req.user.sub);
  }
}
