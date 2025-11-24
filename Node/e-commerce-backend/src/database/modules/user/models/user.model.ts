import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  DeleteDateColumn
} from "typeorm";
import type { Cart } from "../../cart/models/cart.model.ts";
import type { Wishlist } from "../../wishlist/models/wishlist.model.ts";
import type { Order } from "../../order/models/order.model.ts";

@Entity({name: "users"})
export class User {
  @PrimaryGeneratedColumn({ name: "id" })
  id!: number;

  @Column({name:"name"})
  name!: string;

  @Column({name:"email"})
  email!: string;

  @Column({name:"phone"})
  phone!: string;

  @Column({name:"password"})
  password!: string;

  @Column({name:"address"})
  address!: string;

  @CreateDateColumn(  { name: "created_at" })
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

// user oneToMany Orders
// user oneToMany wishlist
// user oneToMany cart
