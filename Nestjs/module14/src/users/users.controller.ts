import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserThrottlerGuard } from 'src/auth/guards/user-throttler.guard';
import { apiKeyGuard } from 'src/common/guards/api-key.guard';

@Controller('users')
@UseGuards(UserThrottlerGuard)
export class UsersController {
  @Get()
  // @UseGuards(apiKeyGuard)
  getuser() {
    return { message: 'Protected user data' };
  }

  // Endpoint to get CSRF token
  @Post('csrf-token')
  getCsrf(@Req() req, @Res() res) {
    res.json({ csrfToken: req.csrfToken() });
  }

  // Protected POST endpoint
  @Post('create')
  createUser(@Req() req) {
    return { message: 'User created successfully' };
  }
}
