import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne
} from "typeorm";
import { Product } from "../../product/models/product.model.ts";
import { User } from "../../user/models/user.model.ts";

@Entity({ name: "carts" })
export class Cart {
  @PrimaryGeneratedColumn({ name: "id" })
  id!: number;

  @Column({ name: "user_id" })
  userId!: number;

  @Column({ name: "product_id" })
  productId!: number;

  @Column({ name: "quantity" })
  quantity!: number;

  @Column({ nullable: true, name: "payment_method" })
  paymentMethod?: string;

  @CreateDateColumn({ name: "added_at" })
  addedAt!: Date;

  @Column({ default: false })
  isAbandoned!: boolean;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @ManyToOne(() => Product, product => product.carts)
  product!: Product;

  @ManyToOne(() => User, user => user.carts)
  user!: User;
}
