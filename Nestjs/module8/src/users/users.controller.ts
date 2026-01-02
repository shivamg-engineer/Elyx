import {
  Controller,
  Get,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CacheInterceptor } from 'src/common/interceptor/cache.interceptor';
import { EmailValidationPipe } from 'src/common/pipes/email-validation.pipe';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  @Get()
  @UseInterceptors(CacheInterceptor)
  findAll() {
    console.log('🚀 Controller hit');
    return {
      users: ['A', 'B', 'C'],
      time: new Date().toISOString(),
    };
  }

  @Get('search')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  searchUser(@Query('email', EmailValidationPipe) email: string) {
    return {
      message: 'Valid email received',
      email,
    };
  }

  @Get('admin-data')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles('admin', 'manager')
  getAdminData() {
    return 'Only admin or manager can access';
  }
}
