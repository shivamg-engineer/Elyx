import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { UserAuthService } from "./user-auth.service";
import { UsersService } from "../users.service";
import { CreateUserDto } from "../dtos/create-user.dto";
import { LoginUserDto } from "../dtos/login-user.dto";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";
import { Throttle } from "@nestjs/throttler";

@ApiTags("User Auth")
@Controller("user-auth")
export class UserAuthController {
  constructor(
    private authService: UserAuthService,
    private userService: UsersService
  ) {}

  // Override default configuration for Rate limiting and duration.
  @Throttle({ short: { limit: 10, ttl: 60000 } })
  @Post("/register")
  @ApiOperation({
    summary: "Register a new user",
    description:
      "Creates a new user account with the provided name, email, phone, password, and address",
  })
  @ApiResponse({
    status: 201,
    description: "User registered successfully",
  })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid input data or email already exists",
  })
  @ApiBody({ type: CreateUserDto })
  async register(@Body() dto: CreateUserDto) {
    return await this.userService.createUser(dto);
  }

  // Override default configuration for Rate limiting and duration.
  @Throttle({ default: { limit: 5, ttl: 60000 } }) // This is "short"
  @UseGuards(AuthGuard("user-local"))
  @Post("/login")
  @ApiOperation({
    summary: "User login",
    description:
      "Authenticates a user with email and password, returning a JWT access token",
  })
  @ApiResponse({
    status: 200,
    description: "Login successful - JWT token returned",
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - Invalid credentials",
  })
  @ApiBody({ type: LoginUserDto })
  async login(@Req() req) {
    console.log("REQ USER => ", req.user);

    return this.authService.login(req.user);
  }

  //   @Post('profile')
  //   async profile(@Req() req) {
  //     return req.user;
  //   }
}
