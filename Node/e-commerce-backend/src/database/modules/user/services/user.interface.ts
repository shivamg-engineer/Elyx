import { User } from "../models/user.model.ts";
import { CreateUserDto, UpdateUserDto } from "../dtos/user.dto.ts";

export interface IUserService {
  create(dto: CreateUserDto): Promise<User>;
  findAll(): Promise<User[]>;
  findOne(id: number): Promise<User | null>;
  update(id: number, dto: UpdateUserDto): Promise<User>;
  patch(id: number, dto: UpdateUserDto): Promise<User>;
  softDelete(id: number): Promise<User>;
}
