import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { VendorsAuthService } from "./vendors-auth.service";
import { CreateVendorDto } from "../dtos/create-vendor.dto";
import { VendorsService } from "../vendors.service";
import { AuthGuard } from "@nestjs/passport";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { LoginVendorDto } from "../dtos/login-vendor.dto";
import { Throttle } from "@nestjs/throttler";

@Controller("vendors-auth")
export class VendorsAuthController {
  constructor(
    private readonly vendorService: VendorsService,
    private readonly vendorsAuthService: VendorsAuthService
  ) {}

  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post("register")
  @ApiOperation({ summary: "Register a new vendor" })
  @ApiResponse({ status: 201, description: "Vendor registered Successfully" })
  @ApiResponse({ status: 400, description: "Validation error" })
  register(@Body() dto: CreateVendorDto) {
    return this.vendorService.create(dto);
  }

  @UseGuards(AuthGuard("vendor-local"))
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post("login")
  @ApiOperation({ summary: "Login vendor" })
  @ApiResponse({
    status: 200,
    description: "Login success & returns JWT token",
  })
  @ApiResponse({ status: 401, description: "Invalid credentials" })
  async login(@Body() dto: LoginVendorDto) {
    const user = await this.vendorsAuthService.validateVendor(
      dto.email,
      dto.password
    );
    return this.vendorsAuthService.login(user);
  }

  // @Post('login')
  // async login(@Body() body: any) {
  //   return this.vendorsAuthService.login(body.email, body.password);
  // }
}
