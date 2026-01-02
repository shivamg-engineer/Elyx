import { Module } from '@nestjs/common';
import { UserAuthController } from './user-auth.controller';
import { UserAuthService } from './user-auth.service';
import { UsersModule } from '../users.module';
import { JwtModule } from '@nestjs/jwt';
import { UserLocalStrategy } from './strategies/user-local.strategy';
import { UserJwtStrategy } from './strategies/user-jwt.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'JWT_SECRET_KEY',
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [UserAuthController],
  providers: [UserAuthService, UserLocalStrategy, UserJwtStrategy],
})
export class UserAuthModule {}
