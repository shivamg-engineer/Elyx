import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretkey',
    });
  }


  async validate(payload: any) {
    console.log('🔍 JWT Strategy - Payload received:', payload);
    console.log('🔍 JWT Strategy - User roles from payload:', payload.roles);
    
    // 👇 Whatever you return here becomes request.user
    const user = {
      id: payload.sub,
      roles: payload.roles,
    };
    
    console.log('🔍 JWT Strategy - Returning user object:', user);
    return user;
  }
}
