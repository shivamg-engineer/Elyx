import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/modules/users/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDto) {
    const hashedPwd = await bcrypt.hash(dto.password, 10);

    const user = this.userRepo.create({ ...dto, password: hashedPwd });
    await this.userRepo.save(user);

    delete user.password;
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { email } });
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findUserByEmail(email);
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);

    return isMatch ? user : null;
  }
}
