import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Order } from "./orders.entity";
import { Product } from "../products/products.entity";

@Entity({ name: "order_items" })
export class OrderItem {
  @PrimaryGeneratedColumn({ name: "id" })
  id!: number;

  @Column({ name: "order_id" })
  orderId!: number;

  @Column({ name: "product_id" })
  productId!: number;

  @Column({ name: "quantity" })
  quantity!: number;

  @Column("decimal", { precision: 10, scale: 2, name: "subtotal" })
  subtotal!: number;

  @Column("decimal", { precision: 10, scale: 2, name: "price" })
  price!: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: "CASCADE" })
  @JoinColumn({ name: "order_id" })
  order!: Order;

  @ManyToOne(() => Product, (product) => product.orderItems)
  @JoinColumn({ name: "product_id" })
  product!: Product;
}
