import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Product } from "../products/products.entity";
import { User } from "../users/users.entity";

@Entity({ name: "carts" })
export class Cart {
  @PrimaryGeneratedColumn({ name: "id" })
  id!: number;

  @ManyToOne(() => Product, (product) => product.carts)
  @JoinColumn({ name: "product_id" })
  product!: Product;

  @ManyToOne(() => User, (user) => user.carts)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column({ name: "quantity" })
  quantity!: number;

  @Column({ name: "payment_method", default: "COD" })
  paymentMethod!: string;

  @CreateDateColumn({ name: "added_at" })
  addedAt!: Date;

  @Column({ default: false })
  isAbandoned!: boolean;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
