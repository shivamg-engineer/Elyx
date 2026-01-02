import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Controller('admin-users')
export class AdminUsersController {
      constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
