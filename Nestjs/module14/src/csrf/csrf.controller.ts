import { Controller, Get, Post, Req } from '@nestjs/common';
import type { Request } from 'express';

@Controller()
export class CsrfController {
  @Get('csrf-token')
  getCsrfToken(@Req() req: Request) {
    return {
      csrfToken: req.csrfToken(),
    };
  }
    // 🔐 CSRF-protected POST endpoint
  @Post('submit')
  submitForm(@Req() req: Request) {
    return {
      message: 'CSRF validation successful',
    };
  }
}
