import { Repository } from "typeorm";
import { User } from "../models/user.model.ts";
import { CreateUserDto, UpdateUserDto, PatchUserDto } from "../dtos/user.dto.ts";
import { AppDataSource } from "../../../typeorm-cli.ts";
import type { IUserService } from "./user.interface.ts";
import bcrypt from "bcryptjs";

export class UserService implements IUserService {
  private userRepo: Repository<User>;

  constructor() {
    this.userRepo = AppDataSource.getRepository(User);
  }

  async create(data: CreateUserDto): Promise<User> {
    // Hash password BEFORE creating user
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = this.userRepo.create({
      ...data,
      password: hashedPassword,
    });

    return await this.userRepo.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepo.find({
      relations: ["orders", "wishlists", "carts"],
    });
  }

  async findOne(id: number): Promise<User | null> {
    return this.userRepo.findOne({
      where: { id },
      relations: ["orders", "wishlists", "carts"],
    });
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new Error("User not found");

    // Check if password is being updated
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    Object.assign(user, data);

    return this.userRepo.save(user);
  }

  async patch(id:number,data:PatchUserDto):Promise<User>{
    const user= await this.userRepo.findOne({where:{id}});
    if(!user) throw new Error("User not found");

    // Check if password is being updated
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    Object.assign(user, data);

    return this.userRepo.save(user);
  }

  async softDelete(id: number): Promise<User> {
    const user = await this.findOne(id);

    if (!user) {
      throw new Error("User not found");
    }

    await this.userRepo.softDelete(user.id);
    return user;
  }
}
