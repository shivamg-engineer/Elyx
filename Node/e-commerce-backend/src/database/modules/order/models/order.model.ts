import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from "typeorm";
import type { Product } from "../../product/models/product.model.ts";
import type { User } from "../../user/models/user.model.ts";

@Entity({ name: "orders" })
export class Order {
  @PrimaryGeneratedColumn({ name: "id" })
  id!: number;

  @Column({name: "user_id"})
  userId!: number;

  @Column({name: "product_id"})
  productId!: number;

  @Column({name:"quantity"})
  quantity!: number;

  @Column("decimal", { precision: 10, scale: 2 , name: "total_amount"})
  totalAmount!: number;

  @Column({name: "status"})
  status!: string; // pending, confirmed, shipped, delivered, cancelled

  @Column({name: "payment_method"})
  paymentMethod!: string; // Only: "COD"

  @Column({name: "shipping_address"})
  shippingAddress!: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @ManyToOne("Product", "orders")
  product!: Product;

  @ManyToOne("User", "orders")
  user!: User;
}
