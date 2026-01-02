import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy} from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_SECRET
,
    });
  }

  async validate(payload: any) {
    // Returned data becomes the "req.user" object
     return {
      id: payload.id,          // 👈 REQUIRED
      username: payload.username,
      roles: payload.roles,
      age: payload.age,
      department: payload.department,
    };
  }
}
