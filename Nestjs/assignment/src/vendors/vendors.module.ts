import { Module } from '@nestjs/common';
import { VendorsAuthModule } from './auth/vendors-auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendor } from 'src/database/modules/vendors/vendors.entity';
import { VendorsService } from './vendors.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vendor])],
  providers: [VendorsService],
  exports: [VendorsService, TypeOrmModule],
})
export class VendorsModule {}
