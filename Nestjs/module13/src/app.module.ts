
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResultInterceptor } from './common/interceptor/result.interceptor';
import { domainExceptionFilter } from './common/filters/domain-exception.filter';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResultInterceptor,
    },
    {
      provide:APP_FILTER,
      useClass:domainExceptionFilter,
    }
  ],
})
export class AppModule {}
