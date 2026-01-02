import { Controller, Get, NotFoundException, Param, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { NotFoundError } from 'rxjs';
import { ResultInterceptor } from 'src/common/interceptor/result.interceptor';

@UseInterceptors(ResultInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  getUser(@Param('id') id: string) {
    const result = this.usersService.getUserById(+id);

    // if (!result.ok) {
    //   throw new NotFoundException(result.error);
    // }

    // return result.value;

    // if (result.isErr()) {
    //   throw new NotFoundException(result.getError());
    // }

    return result;
  }
}
