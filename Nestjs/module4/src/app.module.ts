import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { LoggingMiddleware } from './middleware/logging.middleware';
import { ProtectedController } from './protected/protected.controller';
import { TestController } from './test/test.controller';
import { AuthController } from './auth/auth.controller';
import { ProfileController } from './profile/profile.controller';
import { AdminUsersController } from './admin-users/admin-users.controller';

@Module({
  imports: [ProductsModule, UsersModule],
  controllers: [AppController, ProtectedController, TestController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer.apply(AuthMiddleware).forRoutes('protected');

    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
// GET /protected
