import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { access } from "fs";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = {
      userId: 1,
      username: "test",
      password: "pass",
      age: 22,
      department: "HR",
    };

    if (username === user.username && pass === user.password) {
      const { password, ...result } = user; //“Take the password field out of user, and copy everything else into a new object called result.”
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      id: user.userId,
      roles: ['admin'],    
      sub: user.userId,
      username: user.username,
      age: user.age,
      department: user.department,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: "15m",
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: "7d",
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
