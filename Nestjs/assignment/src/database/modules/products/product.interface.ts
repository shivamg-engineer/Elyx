import { Product } from "./products.entity";
import { CreateProductDto, UpdateProductDto } from "./dto/product.dto";

export interface IProductService {
  createProduct(dto: CreateProductDto, vendorId: number): Promise<Product>;
  findAll(query: any): Promise<{
    data: Product[];
    total: number;
    page: number;
    totalPages: number;
  }>;
  findOne(id: number): Promise<Product | null>;
  update(id: number, dto: UpdateProductDto, vendorId: number): Promise<Product>;
  delete(id: number, vendorId: number): Promise<string>;
}
