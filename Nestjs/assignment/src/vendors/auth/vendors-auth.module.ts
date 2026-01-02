import { Module } from '@nestjs/common';
import { VendorsAuthController } from './vendors-auth.controller';
import { VendorsAuthService } from './vendors-auth.service';
import { VendorsModule } from '../vendors.module';
import { JwtModule } from '@nestjs/jwt';
import { VendorLocalStrategy } from './strategies/vendor-local.strategy';
import { VendorJwtStrategy } from './strategies/vendor-jwt.strategy';

@Module({
  imports: [
    VendorsModule,
    JwtModule.register({
      secret: 'VENDOR_JWT_SECRET',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [VendorsAuthController], // 👈 ONLY controllers here
  providers: [
    VendorsAuthService,
    VendorLocalStrategy, // 👈 Strategy must be here
    VendorJwtStrategy
  ],
  exports: [VendorsAuthService],
})
export class VendorsAuthModule { }
