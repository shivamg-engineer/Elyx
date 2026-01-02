import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { ErrorsInterceptor } from '../interceptors/errors.interceptor';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(TransformInterceptor)
  @Get('user')
  getUser() {
    return { name: 'John' };
  }

  @UseInterceptors(ErrorsInterceptor)
  @Get('error')
  getError() {
    throw new Error('Original Error');
  }


  //  // 🔹 Auth stuff
  // @Post('register')
  // register(@Body() dto: any) {
  //   return this.usersService.register(dto);
  // }

  // @Post('login')
  // login(@Body() dto: any) {
  //   return this.usersService.login(dto);
  // }

  // // 🔹 User self profile
  // @Get('me')
  // getMe() {
  //   return this.usersService.getMe();
  // }

  // @Patch('me')
  // updateMe(@Body() dto: any) {
  //   return this.usersService.updateMe(dto);
  // }

  // // 🔹 Admin stuff
  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(id);
  // }
}

// ✅ If Interceptor is WORKING, you will see:

// {
//   "data": {
//     "name": "John"
//   }
// }

// ❌ If Interceptor is NOT working, you will see:

// {
//   "name": "John"
// }

// ✅ This confirms 100% success
