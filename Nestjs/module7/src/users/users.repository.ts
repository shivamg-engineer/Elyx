import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import { BaseRepository } from 'src/common/repositories/base.repository';

@Injectable()
export class UsersRepository extends BaseRepository<Users> {
  constructor(
    @InjectRepository(Users)
    repository: Repository<Users>,
  ) {
    super(repository);
  }

  // ✅ Only entity-specific methods here
  findByEmail(email: string) {
    return this.repository.findOneBy({ email });
  }
}
