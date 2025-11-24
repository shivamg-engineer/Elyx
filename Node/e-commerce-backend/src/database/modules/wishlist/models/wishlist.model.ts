import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import type { Product } from "../../product/models/product.model.ts";
import type { User } from "../../user/models/user.model.ts";

@Entity({name: "wishlists"})
export class Wishlist {
  @PrimaryGeneratedColumn({ name: "id" })
  id!: number;

  @Column({ name: "user_id" })
  userId!: number;

  @Column({ name: "product_id" })
  productId!: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @ManyToOne("Product", "wishlists")
  product!: Product;

  @ManyToOne("User", "wishlists")
  user!: User;
}
