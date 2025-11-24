import { Product } from "../models/product.model.ts";
import { CreateProductDto, UpdateProductDto } from "../dtos/product.dto.ts";

export interface IProductService {
  create(dto: CreateProductDto): Promise<Product>;
  findAll(): Promise<Product[]>;
  findOne(id: number): Promise<Product | null>;
  update(id: number, dto: UpdateProductDto): Promise<Product>;
  delete(id: number): Promise<Product>;
}
