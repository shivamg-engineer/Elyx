import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  register(@Body() dto: any) {
    return this.usersService.register(dto);
  }

  @Post('login')
  login(@Body() dto: any) {
    return this.usersService.login(dto);
  }
}
