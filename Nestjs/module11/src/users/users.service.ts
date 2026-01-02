import { Inject, Injectable } from '@nestjs/common';

export interface User {
  id: number;
  name: string;
}

export interface UsersRepository {
  findAll(): Promise<User[]>;
  findOne(id: number): Promise<User | null>;
}

@Injectable()
export class UsersService {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepo: UsersRepository,
  ) {}
  
  async getUsers() {
    return this.usersRepo.findAll();
  }

  async getUserById(id: number) {
    return this.usersRepo.findOne(id);
  }
}
