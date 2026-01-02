import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/modules/users/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // 👈 needed for repository injection
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule], // 👈 so AuthModule can use it
})
export class UsersModule {}
