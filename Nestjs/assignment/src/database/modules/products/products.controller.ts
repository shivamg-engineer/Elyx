import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import {
  CreateProductDto,
  ProductFilterDto,
  UpdateProductDto,
} from "./dto/product.dto";
import { ProductsService } from "./products.service";
import { AuthGuard } from "@nestjs/passport";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { RolesGuard } from "src/common/guards/roles.guard";
import { Roles } from "src/common/decorators/roles.decorators";
import { Throttle } from "@nestjs/throttler";

@ApiBearerAuth()
@ApiTags("Products")
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AuthGuard("vendor-jwt"), RolesGuard)
  @Roles("vendor")
  @Post("create")
  @ApiOperation({ summary: "Create new product (Vendor Only)" })
  @ApiResponse({ status: 201, description: "Product created successfully" })
  @ApiResponse({ status: 403, description: "Only vendor can create product" })
  async createProduct(@Body() dto: CreateProductDto, @Req() req) {
    const vendorId = req.user.sub;
    return await this.productsService.createProduct(dto, vendorId);
  }

  @Throttle({ default: { limit: 100, ttl: 60000 } }) //long
  @Get()
  @ApiOperation({
    summary: "Get product list with search, filters & pagination",
  })
  async findAll(@Query() query: ProductFilterDto) {
    return await this.productsService.findAll(query);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get product by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: "Product not found" })
  async findOne(@Param("id") id: number) {
    return await this.productsService.findOne(id);
  }

  @UseGuards(AuthGuard("vendor-jwt"), RolesGuard)
  @Roles("vendor")
  @Delete(":id")
  @ApiOperation({ summary: "Delete product (Vendor Only)" })
  @ApiResponse({ status: 200, description: "Product deleted" })
  @ApiResponse({ status: 403, description: "Unauthorized vendor" })
  async deleteProduct(@Param("id") id: number, @Req() req) {
    const vendorId = req.user.sub;
    return await this.productsService.delete(id, vendorId);
  }

  @UseGuards(AuthGuard("vendor-jwt"), RolesGuard)
  @Roles("vendor")
  @Put(":id")
  @ApiOperation({ summary: "Update entire product (Vendor Only)" })
  @ApiParam({ name: "id", type: Number })
  async updateProduct(
    @Param("id") id: number,
    @Body() dto: UpdateProductDto,
    @Req() req
  ) {
    const vendorId = req.user.sub;
    return await this.productsService.update(id, dto, vendorId);
  }

  @UseGuards(AuthGuard("vendor-jwt"), RolesGuard)
  @Roles("vendor")
  @Patch(":id")
  @ApiOperation({ summary: "Update entire product (Vendor Only)" })
  @ApiParam({ name: "id", type: Number })
  async patchProduct(
    @Param("id") id: number,
    @Body() dto: UpdateProductDto,
    @Req() req
  ) {
    const vendorId = req.user.sub;
    return await this.productsService.patch(id, dto, vendorId);
  }
}
