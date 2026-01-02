import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { VendorOrdersService } from "./vendor-orders.service";
import { RolesGuard } from "src/common/guards/roles.guard";
import { Roles } from "src/common/decorators/roles.decorators";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { Throttle } from "@nestjs/throttler";

@ApiTags("Vendor Orders")
@Controller("vendor-orders")
@UseGuards(AuthGuard("vendor-jwt"), RolesGuard)
@Roles("vendor")
@ApiBearerAuth()
export class VendorOrdersController {
  constructor(private readonly vendorOrderService: VendorOrdersService) {}

  @Throttle({ default: { limit: 50, ttl: 60000 } })
  @Get()
  @ApiOperation({
    summary: "Get vendor's orders",
    description:
      "Retrieves all orders associated with the authenticated vendor",
  })
  @ApiResponse({
    status: 200,
    description: "Orders retrieved successfully",
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - Invalid or missing JWT token",
  })
  @ApiResponse({
    status: 403,
    description: "Forbidden - User is not a vendor",
  })
  getVendorOrders(@Req() req) {
    return this.vendorOrderService.getVendorOrders(req.user.sub);
  }
}
