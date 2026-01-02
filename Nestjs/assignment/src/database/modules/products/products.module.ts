import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { VendorsModule } from '../vendors/vendors.module';
import { Vendor } from '../vendors/vendors.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Vendor]), // 👈 allow service to inject repository
    VendorsModule, // 👈 for vendor existence/validation
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
