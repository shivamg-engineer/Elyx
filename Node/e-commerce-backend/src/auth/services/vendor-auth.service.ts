import bcrypt from "bcryptjs";
import { Repository } from "typeorm";
import { AppDataSource } from "../../database/typeorm-cli.ts"; // adjust path
import { Vendor } from "../../database/modules/vendor/models/vendor.model.ts"; // adjust path
import { VendorRegisterDto, VendorLoginDto } from "../dtos/vendor-auth.dto.ts";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../auth.utils.ts";
import type { JwtPayload } from "../auth.types.ts";

export class VendorAuthService {
  private repo: Repository<Vendor>;

  constructor() {
    this.repo = AppDataSource.getRepository(Vendor);
  }

  async register(dto: VendorRegisterDto) {
    const exists = await this.repo.findOne({ where: { email: dto.email } });
    if (exists) {
      throw new Error("Email already exists");
    }

    const hash = await bcrypt.hash(dto.password, 10);
    const captalize=dto.name.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
    console.log(captalize);
    const vendor = this.repo.create({
      name: dto.name.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" "),
      email: dto.email,
      password: hash,
      phone: dto.phone,
      storeName: dto.storeName,
      gstin: dto.gstin ?? null,
    } as VendorRegisterDto);
    
    await this.repo.save(vendor);

    // don't return password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safe } = vendor as any;

    return {
      message: "vendor created",
      vendor: safe,
    };
  }

  async login(dto: VendorLoginDto) {
    const vendor = await this.repo.findOne({ where: { email: dto.email } });
    if (!vendor) throw new Error("Invalid credentials");

    const match = await bcrypt.compare(dto.password, vendor.password);
    if (!match) throw new Error("Invalid credentials");

    // build typed payload
    const payload: Omit<JwtPayload, "iat" | "exp"> = {
      id: vendor.id,
      email: vendor.email,
      role: "vendor",
    };

    return {
      accessToken: signAccessToken(payload),
      refreshToken: signRefreshToken(payload),
      vendor: {
        id: vendor.id,
        name: (vendor as any).name,
        email: vendor.email,
        phone: vendor.phone,
        storeName: vendor.storeName,
      },
    };
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) throw new Error("refreshToken required");

    const payload = verifyRefreshToken(refreshToken);
    if (payload.role !== "vendor") throw new Error("Invalid refresh token");

    const newAccess = signAccessToken({
      id: payload.id,
      email: payload.email,
      role: "vendor",
    });

    return { accessToken: newAccess };
  }
}
