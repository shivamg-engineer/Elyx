import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { VendorsAuthService } from '../vendors-auth.service';

@Injectable()
export class VendorLocalStrategy extends PassportStrategy(
  Strategy,
  'vendor-local',
) {
  constructor(private authService: VendorsAuthService) {
    super({ usernameField: 'email' });
  }

  validate(email: string, password: string) {
    return this.authService.validateVendor(email, password);
  }
}
