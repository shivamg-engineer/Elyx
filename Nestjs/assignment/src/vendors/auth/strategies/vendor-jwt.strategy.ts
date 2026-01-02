import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class VendorJwtStrategy extends PassportStrategy(
  Strategy,
  "vendor-jwt"
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.VENDOR_JWT_SECRET || "VENDOR_JWT_SECRET", // must match login
    });
  }

  async validate(payload: any) {
    return {
      sub: payload.sub, // vendorId
      email: payload.email,
      role: payload.role,
    };
  }
}
