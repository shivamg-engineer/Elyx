import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { csrfProtection } from './common/middleware/csrf.middleware';
import { CsrfModule } from './csrf/csrf.module';
import { CsrfController } from './csrf/csrf.controller';

@Module({
  imports: [
    // Configure throttling with proper storage backend for version 6.5.0
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60,
          limit: 5,
        },
      ],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    CsrfModule,
  ],
  controllers: [AppController, UsersController,CsrfController],
  providers: [AppService],
})
export class AppModule {
   configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(csrfProtection)
      .forRoutes({ path: 'users/create', method: RequestMethod.POST });
  }
}
