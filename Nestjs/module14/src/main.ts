import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    app.use(cookieParser()); // 1️⃣ REQUIRED
  app.use(
    csurf({
      cookie: {
        httpOnly: true,
        sameSite: 'strict',
      },
    }),
  ); // 2️⃣ CSRF middleware

  const allowedOrigins = ['http://localhost:3000', 'http://example.com'];

  app.enableCors({
    origin:(origin:string,callback)=>{
      if(!origin){
        return callback(null,true);
      }
      if(allowedOrigins.includes(origin)){
        return callback(null,true);
      }

      callback(new Error('Not allowed by CORS'));
    },

    credentials:true,
    methods:['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
    allowedHeaders:['Content-Type','Authorization'],
  })

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
