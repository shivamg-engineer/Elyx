import { Injectable, UnauthorizedException } from "@nestjs/common";
import { VendorsService } from "../vendors.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class VendorsAuthService {
  constructor(
    private vendorService: VendorsService,
    private jwtService: JwtService
  ) {}

  async validateVendor(email: string, password: string) {
    const vendor = await this.vendorService.findByEmail(email);
    if (!vendor) throw new UnauthorizedException();

    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) throw new UnauthorizedException();

    return vendor;
  }

  async login(vendor: any) {
    return {
      token: this.jwtService.sign({
        sub: vendor.id,
        email: vendor.email,
        role: "vendor",
      }),
    };
  }
  // async login(email: string, password: string) {
  //   const vendor = await this.vendorService.findByEmail(email);

  //   if (!vendor) {
  //     throw new UnauthorizedException('Vendor not found');
  //   }

  //   const isMatch = await bcrypt.compare(password, vendor.password);
  //   if (!isMatch) {
  //     throw new UnauthorizedException('Invalid password');
  //   }

  //   return {
  //     token: this.jwtService.sign({
  //       sub: vendor.id,
  //       email: vendor.email,
  //       role: 'vendor',
  //     }),
  //   };
  // }
}
