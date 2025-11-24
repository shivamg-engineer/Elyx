import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  DeleteDateColumn,
} from "typeorm";
import type { Product } from "../../product/models/product.model.ts";

@Entity({ name: "vendors" })
export class Vendor {
  @PrimaryGeneratedColumn({ name: "id" })
  id!: number;

  @Column({ name: "name" })
  name!: string;

  @Column({ name: "email" })
  email!: string;

  @Column({ name: "phone" })
  phone!: string;

  @Column({ name: "password" })
  password!: string; // hashed

  @Column({ name: "store_name" })
  storeName!: string;

  @Column({ name: "gstin" })
  gstin!: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt!: Date;

  @OneToMany("Product", "vendor")
  products!: Product[];
}
