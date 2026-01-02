import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  DeleteDateColumn,
} from "typeorm";
import { Order } from "../orders/orders.entity";
import { Wishlist } from "../wishlists/wishlist.entity";
import { Cart } from "../carts/carts.entity";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn({ name: "id" })
  id!: number;

  @Column({ name: "name" })
  name!: string;

  @Column({ name: "email" })
  email!: string;

  @Column({ name: "phone" })
  phone!: string;

  @Column({ name: "password" })
  password!: string;

  @Column({ name: "address" })
  address!: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt?: Date;

  @OneToMany("Order", "user")
  orders!: Order[];

  @OneToMany("Wishlist", "user")
  wishlists!: Wishlist[];

  @OneToMany("Cart", "user")
  carts!: Cart[];
}
