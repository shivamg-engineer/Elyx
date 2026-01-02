import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CsrfController } from './csrf.controller';
import { csrfProtection } from 'src/common/middleware/csrf.middleware';

@Module({
  controllers: [CsrfController],
})
export class CsrfModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(csrfProtection).forRoutes('*');
  }
}
