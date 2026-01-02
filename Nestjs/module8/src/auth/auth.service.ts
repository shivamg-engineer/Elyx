import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private jwtService:JwtService){}

    login(){
        const user={
            id:1,
            roles:['manager']
        };

        const payoad={
            sub:user.id,
            roles:user.roles,
        }

        return {
      access_token: this.jwtService.sign(payoad),
    };
    }
}
