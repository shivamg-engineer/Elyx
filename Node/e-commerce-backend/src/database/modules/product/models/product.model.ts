import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import type { Wishlist } from "../../wishlist/models/wishlist.model.ts";
import type { Cart } from "../../cart/models/cart.model.ts";
import type { Order } from "../../order/models/order.model.ts";

@Entity({name: "products"})
export class Product {
  @PrimaryGeneratedColumn({ name: "id" })
  id!: number;

  @Column({name:"name"})
  name!: string;

  @Column({name:"description"})
  description!: string;

  @Column("decimal", { name:"price" , precision: 10, scale: 2 })
  price!: number;

  @Column({name:"stock_quantity"})
  stockQuantity!: number;

  @Column({name:"category"})
  category!: string;

  @Column({name:"image_url"})
  imageUrl!: string;

  // Soft delete column
  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt!: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @ManyToOne("Vendor", "products")
  vendor!: any;

  @OneToMany("Order", "product")
  orders!: Order[];

  @OneToMany("Wishlist", "product")
  wishlists!: Wishlist[];

  @OneToMany("Cart", "product")
  carts!: Cart[];
}
// product ManyToOne vendor
// product oneToMany orders
// product oneToMany wishlist
// product oneToMany cart
