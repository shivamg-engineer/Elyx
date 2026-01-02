import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserAuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: "USER" };
    console.log("PAYLOAD => ", payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);
    if (!user) throw new UnauthorizedException();

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException();

    return user;
  }
}
