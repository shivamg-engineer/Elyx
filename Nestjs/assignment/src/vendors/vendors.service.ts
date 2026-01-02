import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vendor } from 'src/database/modules/vendors/vendors.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class VendorsService {
  constructor(
    @InjectRepository(Vendor)
    private vendorRepo: Repository<Vendor>,
  ) {}

  async create(dto: Partial<Vendor>) {
    const hashedPwd = await bcrypt.hash(dto.password, 10);

    const vendor = this.vendorRepo.create({
      ...dto,
      password: hashedPwd,
    });

    await this.vendorRepo.save(vendor);
    delete vendor.password;
    return vendor;
  }

  async findByEmail(email: string) {
    return this.vendorRepo.findOne({ where: { email } });
  }
}
