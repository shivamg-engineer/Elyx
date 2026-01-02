

import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET') || 'default-access-secret',
      ignoreExpiration: false,
    });
  }

  async validate(payload: { sub: number; userId?: number }) {
    // Support both 'sub' and 'userId' properties for flexibility
    return { userId: payload.sub || payload.userId };
  }
}
