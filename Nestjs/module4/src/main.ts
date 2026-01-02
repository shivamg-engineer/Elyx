import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { ExceptionInterceptor } from './interceptors/exception.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalInterceptors(new ExceptionInterceptor());
  await app.listen(process.env.PORT ?? 3000);
  
}
bootstrap();
