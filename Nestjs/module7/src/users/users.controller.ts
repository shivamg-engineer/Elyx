import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // POST /users
  @Post()
  create(@Body() body: Partial<Users>) {
    return this.usersService.create(body);
  }
  
  // ✅ Test BaseRepository.findAll()
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // ✅ Test BaseRepository.findById()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(Number(id));
  }

  // ✅ Test UsersRepository.findByEmail()
  @Get('by-email/search')
  findByEmail(@Query('email') email: string) {
    return this.usersService.findByEmail(email);
  }
}
