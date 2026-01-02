import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { Users } from "./user.entity";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  findAll() {
    return this.usersRepo.findAll(); // BaseRepository
  }

  findOne(id: number) {
    return this.usersRepo.findById(id); // BaseRepository
  }

  create(data: Partial<Users>) {
    return this.usersRepo.create(data); // BaseRepository
  }

  findByEmail(email: string) {
    return this.usersRepo.findByEmail(email); // UsersRepository
  }
}
