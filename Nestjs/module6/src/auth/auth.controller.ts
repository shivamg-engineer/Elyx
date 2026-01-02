import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request, Response } from "@nestjs/common";
import { JwtAuthGuard } from "./gaurds/jwt-auth.guard";
import { AbacGuard } from "./gaurds/abac.guard";
import { AbacPolicy } from "./decorators/abac.decorator";
import { Public } from "./decorators/public.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("/login")
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validateUser(
      body.username,
      body.password
    );

    if (!user) {
      throw new UnauthorizedException("Invalid username or password");
    }

    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req) {
    return {
      message: "This is a protected route",
      user: req.user,
    };
  }

  @UseGuards(JwtAuthGuard, AbacGuard)
  @AbacPolicy({ ownerField: 'ownerId' })
  @Get('documents/:id')
  getDocument(@Param('id') id: string, @Request() req) {
    return {
      message: 'If you see this, you own the document',
      documentId: id,
      userId: req.user.id,
    };
  }
}
