import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthController } from 'src/auth/auth.controller';
import { ProfileController } from 'src/profile/profile.controller';
import { AdminUsersController } from 'src/admin-users/admin-users.controller';

@Module({
    controllers: [AuthController, ProfileController, AdminUsersController],
      providers: [UsersService],
      // exports:[UsersService]
})
export class UsersModule {}
