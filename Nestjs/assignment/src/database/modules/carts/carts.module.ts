import { Controller, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cart } from "./carts.entity";
import { CartsController } from "./carts.controller";
import { CartsService } from "./carts.service";

@Module({
  imports: [TypeOrmModule.forFeature([Cart])],
  controllers: [CartsController],
  providers: [CartsService],
  exports: [CartsService, TypeOrmModule],
})
export class CartsModule {}
