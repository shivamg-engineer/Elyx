import { Repository } from "typeorm";
import { Vendor } from "../models/vendor.model.ts";
import { AppDataSource } from "../../../typeorm-cli.ts";
import {
  CreateVendorDto,
  PatchVendorDto,
  UpdateVendorDto,
} from "../dtos/vendor.dto.ts";
import bcrypt from "bcryptjs";
import type { IVendorService } from "./vendor.interface.ts";

export class VendorService implements IVendorService {
  private vendorRepo: Repository<Vendor>;

  constructor() {
    this.vendorRepo = AppDataSource.getRepository(Vendor);
  }
  private ensureOwner(targetId: number, currentVendorId: number) {
    if (targetId !== currentVendorId) {
      throw new Error("Forbidden: You cannot access another vendor's account.");
    }
  }
  async create(data: CreateVendorDto): Promise<Vendor> {
    const vendor = this.vendorRepo.create({
      ...data,
      password: await bcrypt.hash(data.password, 10),
    });

    return this.vendorRepo.save(vendor);
  }

  async findAll(): Promise<Vendor[]> {
    return this.vendorRepo.find({
      relations: ["products"],
    });
  }
  async findOne(id: number,currentVendorId:number): Promise<Vendor | null> {
     this.ensureOwner(id, currentVendorId);

    return this.vendorRepo.findOne({
      where: { id },
      relations: ["products"],
    });
  }

  async update(id: number, dto: UpdateVendorDto, currentVendorId:number): Promise<Vendor> {
     this.ensureOwner(id, currentVendorId);

    const vendor = await this.vendorRepo.findOneBy({ id });
    if (!vendor) throw new Error("vendor not found");

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }
    Object.assign(vendor, dto);
    return this.vendorRepo.save(vendor);
  }

  async patch(id: number, dto: PatchVendorDto, currentVendorId:number): Promise<Vendor> {
     this.ensureOwner(id, currentVendorId);

    const vendor = await this.vendorRepo.findOneBy({ id });
    if (!vendor) throw new Error("vendor not found");

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }
    Object.assign(vendor, dto);
    return this.vendorRepo.save(vendor);
  }

  async softDelete(id: number,currentVendorId:number): Promise<Vendor> {
     this.ensureOwner(id, currentVendorId);

    const vendor = await this.vendorRepo.findOne({ where: { id } });
    if (!vendor) throw new Error("vendor not found");

    this.vendorRepo.softDelete(id);
    return vendor;
  }
}
