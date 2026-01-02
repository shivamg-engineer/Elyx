import { Controller, Get, UseGuards } from '@nestjs/common';

// @UseGuards(JwtAuthGuard)
@Controller('protected')
export class ProtectedController {

  @Get()
  getProtectedData() {
    return {
      message: 'You have accessed a protected route ✅',
    };
  }

}
