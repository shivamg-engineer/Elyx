import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { VendorsAuthService } from '../auth/vendors-auth.service';

@Injectable()
export class VendorLocalStrategy extends PassportStrategy(
  Strategy,
  'vendor-local',
) {
  constructor(private readonly authService: VendorsAuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    return this.authService.validateVendor(email, password);
  }
}
