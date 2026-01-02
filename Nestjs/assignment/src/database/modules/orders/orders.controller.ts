import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Req,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { OrdersService } from "./orders.service";
import {
  PlaceOrderDto,
  UpdateOrderDto,
  PatchOrderDto,
  OrderResponseDto,
  OrderTotalResponseDto,
} from "./dto/order.dto";
import { RolesGuard } from "src/common/guards/roles.guard";
import { Roles } from "src/common/decorators/roles.decorators";
import { Throttle } from "@nestjs/throttler";

@ApiTags("Orders")
@Controller("orders")
@UseGuards(AuthGuard("user-jwt"), RolesGuard)
@Roles("user")
@ApiBearerAuth()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Throttle({ default: { limit: 20, ttl: 60000 } })
  @Post()
  @ApiOperation({
    summary: "Create a new order",
    description:
      "Creates a new order for the authenticated user with the provided shipping address and payment method",
  })
  @ApiResponse({
    status: 201,
    description: "Order created successfully",
    type: OrderResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - Invalid or missing JWT token",
  })
  @ApiResponse({ status: 400, description: "Bad request - Invalid input data" })
  @ApiBody({ type: PlaceOrderDto })
  async createOrder(@Body() dto: PlaceOrderDto, @Req() req: any) {
    const userId = req.user.sub;
    const order = await this.ordersService.placeOrder(userId, dto);
    return {
      message: "Order created successfully",
      data: order,
    };
  }

  @Throttle({ default: { limit: 50, ttl: 60000 } })
  @Get()
  @ApiOperation({
    summary: "Get all orders",
    description: "Retrieves all orders placed by the authenticated user",
  })
  @ApiResponse({
    status: 200,
    description: "All orders fetched successfully",
    type: [OrderResponseDto],
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - Invalid or missing JWT token",
  })
  async getAllOrders(@Req() req: any) {
    const userId = req.user.sub;
    const orders = await this.ordersService.getAllOrders(userId);
    return {
      message: "All orders fetched successfully",
      data: orders,
    };
  }

  @Throttle({ default: { limit: 50, ttl: 60000 } })
  @Get(":id")
  @ApiOperation({
    summary: "Get order by ID",
    description:
      "Retrieves a specific order by its ID for the authenticated user",
  })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Unique identifier of the order",
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: "Order fetched successfully",
    type: OrderResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - Invalid or missing JWT token",
  })
  @ApiResponse({ status: 404, description: "Order not found" })
  async getOrderById(@Param("id") id: string, @Req() req: any) {
    const userId = req.user.sub;
    const order = await this.ordersService.getOrderById(parseInt(id), userId);
    return {
      message: "Order fetched successfully",
      data: order,
    };
  }

  @Throttle({ default: { limit: 20, ttl: 60000 } })
  @Patch(":id")
  @ApiOperation({
    summary: "Update order",
    description:
      "Updates an existing order's details such as status, payment method, shipping address, or quantity",
  })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Unique identifier of the order to update",
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: "Order updated successfully",
    type: OrderResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - Invalid or missing JWT token",
  })
  @ApiResponse({ status: 404, description: "Order not found" })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid update data",
  })
  @ApiBody({ type: UpdateOrderDto })
  async updateOrder(
    @Param("id") id: string,
    @Body() dto: UpdateOrderDto | PatchOrderDto,
    @Req() req: any
  ) {
    const userId = req.user.sub;
    const order = await this.ordersService.updateOrder(
      parseInt(id),
      userId,
      dto
    );
    return {
      message: "Order updated successfully",
      data: order,
    };
  }

  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Delete(":id")
  @ApiOperation({
    summary: "Delete order",
    description:
      "Deletes a specific order by its ID for the authenticated user",
  })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Unique identifier of the order to delete",
    example: 1,
  })
  @ApiResponse({ status: 200, description: "Order deleted successfully" })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - Invalid or missing JWT token",
  })
  @ApiResponse({ status: 404, description: "Order not found" })
  async deleteOrder(@Param("id") id: string, @Req() req: any) {
    const userId = req.user.sub;
    const result = await this.ordersService.deleteOrder(parseInt(id), userId);
    return result;
  }

  @Throttle({ default: { limit: 30, ttl: 60000 } })
  @Get(":id/total")
  @ApiOperation({
    summary: "Calculate order total",
    description:
      "Calculates and returns the total amount for a specific order including all items",
  })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Unique identifier of the order",
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: "Order total calculated successfully",
    type: OrderTotalResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - Invalid or missing JWT token",
  })
  @ApiResponse({ status: 404, description: "Order not found" })
  async getOrderTotal(@Param("id") id: string, @Req() req: any) {
    const userId = req.user.sub;
    const total = await this.ordersService.getOrderTotal(parseInt(id), userId);
    return {
      message: "Order total calculated successfully",
      data: total,
    };
  }
}
