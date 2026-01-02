import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserAuthService } from '../user-auth.service';

@Injectable()
export class UserLocalStrategy extends PassportStrategy(
  Strategy,
  'user-local',
) {
  constructor(private readonly authService: UserAuthService) {
    super({ usernameField: 'email' }); // 👈 IMPORTANT!
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    return user;
  }
}
