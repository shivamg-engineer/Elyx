<<<<<<< HEAD
import { Repository,Like, MoreThanOrEqual, LessThanOrEqual  } from "typeorm";
=======
import { Repository, Like, MoreThanOrEqual, LessThanOrEqual } from "typeorm";
>>>>>>> ac8ca4da (Initial commit)
import { AppDataSource } from "../../../typeorm-cli.ts";
import { Product } from "../models/product.model.ts";
import { CreateProductDto, UpdateProductDto } from "../dtos/product.dto.ts";
import { Vendor } from "../../vendor/models/vendor.model.ts";
import type { IProductService } from "./product.interface.ts";

export class ProductService implements IProductService {
  private productRepo: Repository<Product>;
  private vendorRepo: Repository<Vendor>;

  constructor() {
    this.productRepo = AppDataSource.getRepository(Product);
    this.vendorRepo = AppDataSource.getRepository(Vendor);
  }

<<<<<<< HEAD
 async getPublicProducts(filters: {
  page: number;
  limit: number;
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  vendorId?: number;
  sort?: string;
}) {
  const {
    page,
    limit,
    search,
    category,
    minPrice,
    maxPrice,
    vendorId,
    sort,
  } = filters;

  const where: any = {};

  //  Search
  if (search) {
    where.name = Like(`%${search}%`);

    // For description OR name search, we need OR condition:
    where.description = Like(`%${search}%`);
  }

  //  Category filter
  if (category) where.category = category;

  //  Price range filter
  if (minPrice !== undefined) where.price = MoreThanOrEqual(minPrice);
  if (maxPrice !== undefined) {
    where.price = {
      ...(where.price || {}),
      ...LessThanOrEqual(maxPrice),
    };
  }

  //  Vendor filter
  if (vendorId !== undefined) where.vendorId = vendorId;

  //  Sorting
  let order: any = {};
  switch (sort) {
    case "price_asc":
      order = { price: "ASC" };
      break;
    case "price_desc":
      order = { price: "DESC" };
      break;
    default:
      order = { createdAt: "DESC" }; // newest
  }

  //  Pagination
  const skip = (page - 1) * limit;

  const [products, total] = await this.productRepo.findAndCount({
    where,
    order,
    skip,
    take: limit,
  });

  return {
    products,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
}

=======
  async getPublicProducts(filters: {
    page: number;
    limit: number;
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    vendorId?: number;
    sort?: string;
  }) {
    const {
      page,
      limit,
      search,
      category,
      minPrice,
      maxPrice,
      vendorId,
      sort,
    } = filters;

    const where: any = {};

    //  Search
    if (search) {
      where.name = Like(`%${search}%`);

      // For description OR name search, we need OR condition:
      where.description = Like(`%${search}%`);
    }

    //  Category filter
    if (category) where.category = category;

    //  Price range filter
    if (minPrice !== undefined) where.price = MoreThanOrEqual(minPrice);
    if (maxPrice !== undefined) {
      where.price = {
        ...(where.price || {}),
        ...LessThanOrEqual(maxPrice),
      };
    }

    //  Vendor filter
    if (vendorId !== undefined) where.vendorId = vendorId;

    //  Sorting
    let order: any = {};
    switch (sort) {
      case "price_asc":
        order = { price: "ASC" };
        break;
      case "price_desc":
        order = { price: "DESC" };
        break;
      default:
        order = { createdAt: "DESC" }; // newest
    }

    //  Pagination
    const skip = (page - 1) * limit;

    const [products, total] = await this.productRepo.findAndCount({
      where,
      order,
      skip,
      take: limit,
    });

    return {
      products,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

>>>>>>> ac8ca4da (Initial commit)
  async create(data: CreateProductDto): Promise<Product> {
    const vendor = await this.vendorRepo.findOneBy({ id: data.vendorId });
    if (!vendor) throw new Error("vendor not found");

    const product = this.productRepo.create({
      ...data,
      vendor: vendor,
    });
    return this.productRepo.save(product);
  }

  async findOne(id: number): Promise<Product | null> {
    return this.productRepo.findOne({
      where: { id },
      relations: ["vendor", "orders", "wishlists", "carts"],
    });
  }

  async findAll(): Promise<Product[]> {
    return this.productRepo.find({
      relations: ["vendor", "orders", "wishlists", "carts"],
    });
  }

  async update(id: number, data: UpdateProductDto): Promise<Product> {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) {
<<<<<<< HEAD
      throw new Error("Order not found");
=======
      throw new Error("product not found");
>>>>>>> ac8ca4da (Initial commit)
    }
    Object.assign(product, data);
    return this.productRepo.save(product);
  }

  async patch(id: number, data: Partial<UpdateProductDto>): Promise<Product> {
<<<<<<< HEAD
    const product = await this.productRepo.findOne({ where: { id } });  
    if (!product) {
      throw new Error("Order not found");
    } 
=======
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) {
      throw new Error("product not found");
    }
>>>>>>> ac8ca4da (Initial commit)
    Object.assign(product, data);
    return this.productRepo.save(product);
  }

  async delete(id: number): Promise<Product> {
    const product = await this.findOne(id);

    if (!product) {
      throw new Error("product not found");
    }
    await this.productRepo.delete(product);
    return product;
  }
}
