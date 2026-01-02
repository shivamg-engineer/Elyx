import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
} from "typeorm";
import type { Wishlist } from "../wishlists/wishlist.entity";
import type { Cart } from "../carts/carts.entity";
import { Vendor } from "../vendors/vendors.entity";
import { OrderItem } from "../orders/order-item.entity";

@Entity({ name: "products" })
export class Product {
  @PrimaryGeneratedColumn({ name: "id" })
  id!: number;

  @Column({ name: "name" })
  name!: string;

  @Column({ name: "description" })
  description!: string;

  @Column("decimal", { name: "price", precision: 10, scale: 2 })
  price!: number;

  @Column({ name: "stock_quantity" })
  stockQuantity!: number;

  @Column({ name: "category" })
  category!: string;

  @Column({ name: "image_url" })
  imageUrl!: string;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt!: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @Column({ name: "vendor_id" })
  vendorId!: number;

  @ManyToOne("Vendor", "products")
  @JoinColumn({ name: "vendor_id" })
  vendor!: Vendor;

  @OneToMany("OrderItem", "product")
  orderItems!: OrderItem[];

  @OneToMany("Wishlist", "product")
  wishlists!: Wishlist[];

  @OneToMany("Cart", "product")
  carts!: Cart[];
}
