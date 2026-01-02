import { Body, Controller, Get, Patch } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Controller('profile')
export class ProfileController {
     constructor(private readonly usersService: UsersService) {}

  @Get()
  getMe() {
    return this.usersService.getMe();
  }

  @Patch()
  updateMe(@Body() dto: any) {
    return this.usersService.updateMe(dto);
  }
}
