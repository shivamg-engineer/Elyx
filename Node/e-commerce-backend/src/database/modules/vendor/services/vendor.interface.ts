import { Vendor } from "../models/vendor.model.ts";
import { CreateVendorDto, UpdateVendorDto } from "../dtos/vendor.dto.ts";

export interface IVendorService {
  create(dto: CreateVendorDto): Promise<Vendor>;
  findAll(): Promise<Vendor[]>;
  findOne(id: number, currentVendorId: number): Promise<Vendor | null>;
  update(id: number, dto: UpdateVendorDto, currentVendorId: number): Promise<Vendor>;
  patch(id: number, dto: UpdateVendorDto, currentVendorId: number): Promise<Vendor>;
  softDelete(id: number, currentVendorId: number): Promise<Vendor>;
}
