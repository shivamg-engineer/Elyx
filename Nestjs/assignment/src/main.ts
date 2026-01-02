import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { WinstonModule } from "nest-winston";
import { winstonLoggerConfig } from "./common/logger/winston-logger.config";
import speedLimit from "express-slow-down";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonLoggerConfig),
  });

  // Apply slowdown middleware for progressive delay
  app.use(
    speedLimit({
      windowMs: 60 * 1000, // 1 minute window
      delayAfter: 50, // Allow 50 requests before adding delay
      delayMs: (hits) => hits * 50, // Add 50ms delay per request over limit
    })
  );

  const config = new DocumentBuilder()
    .setTitle("E-Commerce API")
    .setDescription("API documentation for User & Vendor Store")
    .setVersion("1.4")
    .addBearerAuth() // 🔐 Enables JWT Authentication in Swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
