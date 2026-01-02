
import { Module } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';
import { apiKeyGuard } from 'src/common/guards/api-key.guard';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { RefreshStrategy } from './refresh.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [ConfigModule, JwtModule.register({})],
  providers: [ApiKeyService, apiKeyGuard, AuthService, RefreshStrategy, JwtStrategy],
  exports: [ApiKeyService],
  controllers: [AuthController],
})
export class AuthModule {}
