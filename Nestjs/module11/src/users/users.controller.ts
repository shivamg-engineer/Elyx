import { Controller, Get } from '@nestjs/common';

@Controller('api/users')
export class UsersController {
  @Get()
  findAll() {
    return [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ];
  }
}
