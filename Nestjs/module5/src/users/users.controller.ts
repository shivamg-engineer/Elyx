import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { TrimPipe } from 'src/pipes/trim.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('validated')
  @UsePipes(TrimPipe)
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  createValidated(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // THIS ROUTE HAS NO VALIDATION
  @Post('raw')
  createRaw(@Body() body: any) {
    return this.usersService.createWithoutValidation(body);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return {
      message: 'User fetched successfully',
      userId: id,
      type: typeof id, // ✅ proves it's now a number
    };
  }
}
