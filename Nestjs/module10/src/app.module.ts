import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';
import { TestController } from './test/test.controller';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { PerformanceInterceptor } from './common/interceptor/performance.interceptor';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AllExceptionFilter } from './common/filters/http-exception.filter';

@Module({
  imports: [LoggerModule, LoggerModule],
  controllers: [AppController, TestController, TestController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: PerformanceInterceptor,
    },
    {
      provide:APP_FILTER,
      useClass:AllExceptionFilter
    }
  ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // ✅ IMPORTANT
  }
}
