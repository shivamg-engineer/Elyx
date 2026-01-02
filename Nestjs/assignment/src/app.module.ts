import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserAuthModule } from "./users/auth/user-auth.module";
import { CartsModule } from "./database/modules/carts/carts.module";
import { OrdersModule } from "./database/modules/orders/orders.module";
import { ProductsModule } from "./database/modules/products/products.module";
import { UsersModule } from "./database/modules/users/users.module";
import { VendorsModule } from "./database/modules/vendors/vendors.module";
import { WishlistsModule } from "./database/modules/wishlists/wishlists.module";
import { VendorsAuthModule } from "./vendors/auth/vendors-auth.module";
import { VendorOrdersController } from "./vendor-orders/vendor-orders.controller";
import { VendorOrdersService } from "./vendor-orders/vendor-orders.service";
import { VendorOrdersModule } from "./vendor-orders/vendor-orders.module";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),

    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: Number(process.env.THROTTLE_TTL) || 10_000, // check every 10 seconds
          limit: Number(process.env.THROTTLE_LIMIT) || 5, // if more than 5 calls...
        },
      ],
    }),

    TypeOrmModule.forRoot({
      type: "mysql",
      driver: require("mysql2"),
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || "root",
      password: process.env.DB_PASSWORD || "Welcome@123",
      database: process.env.DB_NAME || "nest_assignDB",
      synchronize: false,
      logging: true,
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      subscribers: [],
      migrations: [__dirname + "/../migrations/*.ts"],
    }),
    UserAuthModule,
    CartsModule,
    OrdersModule,
    ProductsModule,
    UsersModule,
    VendorsModule,
    VendorsAuthModule,
    WishlistsModule,
    VendorOrdersModule,
  ],
  controllers: [AppController, VendorOrdersController],
  providers: [
    AppService,
    VendorOrdersService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
