import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login() {
    return this.authService.login(1); // demo user
  }

  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  refresh(@Req() req) {
    const userId = req.user.userId;
    const refreshToken = req.headers.authorization.split(' ')[1];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
