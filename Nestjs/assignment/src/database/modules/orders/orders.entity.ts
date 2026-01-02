import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import type { Product } from "../products/products.entity";
import { User } from "../users/users.entity";
import { OrderItem } from "./order-item.entity";

@Entity({ name: "orders" })
export class Order {
  @PrimaryGeneratedColumn({ name: "id" })
  id!: number;

  @Column({ name: "user_id" })
  userId!: number;

  // existing DB uses `total_amount` column name; map entity to that column
  @Column("decimal", { precision: 10, scale: 2, name: "total_amount" })
  // DB migration uses `total_amount` column name; map the entity property `total` to that column
  total!: number;

  @Column({ name: "status" })
  status!: string; // pending, confirmed, shipped, delivered, cancelled

  @Column({ name: "payment_method" })
  paymentMethod!: string; // Only: "COD"

  @Column({ name: "shipping_address" })
  shippingAddress!: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: "user_id" })
  user!: User;

  // Legacy columns kept for compatibility with existing migrations/table
  @ManyToOne(() => require("../products/products.entity").Product, {
    nullable: true,
  })
  @JoinColumn({ name: "product_id" })
  product?: Product;

  @Column({ name: "quantity", nullable: true })
  quantity?: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  items!: OrderItem[];
}
