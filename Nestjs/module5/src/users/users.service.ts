import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return {
      message: 'User created successfully',
      data: createUserDto,
    };
  }

   //  Route WITHOUT validation
  createWithoutValidation(data: any) {
    return {
      message: 'User created without validation',
      data,
    };
  }
}
