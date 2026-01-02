import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService): JwtModuleOptions => {
        const secret = config.get<string>('JWT_SECRET') ?? 'changeme';
        const rawExpires = config.get<string>('JWT_EXPIRES_IN') ?? '1h';

        // coerce to the type JwtModule expects
        const expiresIn = rawExpires as unknown as number | import('ms').StringValue;

        return {
          secret,
          signOptions: {
            expiresIn,
          },
        };
      }

    })
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtModule], // <-- VERY important!
})
export class AuthModule { }
