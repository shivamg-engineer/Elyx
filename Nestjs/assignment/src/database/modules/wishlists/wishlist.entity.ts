import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import type { Product } from "../products/products.entity";
import type { User } from "../users/users.entity";

@Entity({ name: "wishlists" })
export class Wishlist {
  @PrimaryGeneratedColumn({ name: "id" })
  id!: number;

  @ManyToOne("User", "wishlists", {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @ManyToOne("Product", "wishlists", {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "product_id" })
  product!: Product;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;
}
