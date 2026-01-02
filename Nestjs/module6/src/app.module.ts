import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthService } from "./auth/auth.service";
import { AuthModule } from "./auth/auth.module";
import { AuthController } from "./auth/auth.controller";
import { ConfigModule } from "@nestjs/config";
import { UsersController } from "./users/users.controller";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "./auth/gaurds/roles.guard";
import { DocumentsController } from "./documents/documents.controller";
import { DocumentsService } from "./documents/documents.service";
import { DocumentsModule } from "./documents/documents.module";
import { JwtAuthGuard } from "./auth/gaurds/jwt-auth.guard";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ← ensures .env is available everywhere
    }),
    AuthModule,
    AuthModule,
    DocumentsModule,
  ],
  controllers: [
    AppController,
    AuthController,
    UsersController,
    DocumentsController,
  ],
  providers: [
    AppService,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    DocumentsService,
  ],
})
export class AppModule {}
