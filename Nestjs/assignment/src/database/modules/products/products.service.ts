import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./products.entity";
import { Repository } from "typeorm";
import {
  CreateProductDto,
  UpdateProductDto,
  ProductResponseDto,
} from "./dto/product.dto";
import { Vendor } from "../vendors/vendors.entity";
import { IProductService } from "./product.interface";

@Injectable()
export class ProductsService implements IProductService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Vendor) private vendorRepo: Repository<Vendor>
  ) {}

  async createProduct(data: CreateProductDto, vendorId: number) {
    const vendor = await this.vendorRepo.findOne({
      where: { id: vendorId },
    });
    if (!vendor) throw new UnauthorizedException("Unauthorized Vendor");

    const product = this.productRepo.create({
      ...data,
      vendor: vendor,
      vendorId: vendorId, // Explicitly set vendorId from authenticated token
    });
    return this.productRepo.save(product);
  }

  async findAll(query: any): Promise<{
    data: Product[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
      sort = "createdAt:DESC",
    } = query;

    const qb = this.productRepo
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.vendor", "vendor")
      .where("product.deletedAt IS NULL");

    if (search) {
      qb.andWhere(
        "(product.name LIKE :search OR product.description LIKE :search)",
        { search: `%${search}%` }
      );
    }

    if (category) {
      qb.andWhere("product.category = :category", { category });
    }

    if (minPrice) {
      qb.andWhere("product.price >= :minPrice", { minPrice: +minPrice });
    }

    if (maxPrice) {
      qb.andWhere("product.price <= :maxPrice", { maxPrice: +maxPrice });
    }

    // Sorting support
    const [sortField, sortOrder] = sort.split(":");
    qb.orderBy(
      `product.${sortField}`,
      sortOrder.toUpperCase() as "ASC" | "DESC"
    );

    qb.take(Number(limit));
    qb.skip((Number(page) - 1) * Number(limit));

    const [products, total] = await qb.getManyAndCount();

    // throw new Error('Method not implemented.');
    // return this.productRepo.find({
    //   where: { deletedAt: null },
    //   relations: ["vendor", "orderItems", "wishlists", "carts"],
    //   select: {
    //     vendor: {
    //       id: true,
    //       name: true,
    //       email: true,
    //       phone: true,
    //       store_name: true,
    //       gstin: true,
    //       createdAt: true,
    //       updatedAt: true,
    //       // password: false, // Explicitly exclude password
    //     },
    //   },
    // });
    return {
      data: products,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    };
  }
  async findOne(id: number): Promise<Product | null> {
    // throw new Error('Method not implemented.');
    const product = await this.productRepo.findOne({
      where: { id, deletedAt: null },

      relations: ["vendor", "orderItems", "wishlists", "carts"],
      select: {
        vendor: {
          id: true,
          name: true,
          email: true,
          phone: true,
          store_name: true,
          gstin: true,
          createdAt: true,
          updatedAt: true,
          // password: false, // Explicitly exclude password
        },
      },
    });

    if (!product) throw new NotFoundException("Product not found");

    return product;
  }

  async update(
    id: number,
    dto: UpdateProductDto,
    vendorId: number
  ): Promise<Product> {
    // throw new Error('Method not implemented.');
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ["vendor"],
    });
    if (!product) {
      throw new Error("Product not found");
    }
    console.log("product-id:", id);
    console.log("Token Vendor:", vendorId);
    console.log("product vendor:", product);
    // Vendor ownership check
    if (product.vendorId !== vendorId) {
      throw new ForbiddenException(
        "You cannot update a product you do not own"
      );
    }

    // Object.assign(product, dto);
    // Merge only valid fields from DTO into the product entity
    const updatedProduct = this.productRepo.merge(product, dto);

    return await this.productRepo.save(updatedProduct);
  }

  async patch(
    id: number,
    dto: UpdateProductDto,
    vendorId: number
  ): Promise<Product> {
    return this.update(id, dto, vendorId); // 👈 avoid duplicate logic
  }

  async delete(id: number, vendorId: number): Promise<string> {
    // throw new Error('Method not implemented.');
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException("Product not found");

    if (product.vendorId !== vendorId) {
      throw new ForbiddenException(
        "You cannot delete a product you do not own"
      );
    }

    await this.productRepo.softDelete(id);
    return "Product deleted successfully";
  }
}
