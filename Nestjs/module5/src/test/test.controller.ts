import { BadRequestException, Controller, Get } from '@nestjs/common';

@Controller('test')
export class TestController {
  @Get('bad')
  badRequest() {
    throw new BadRequestException('This is a bad request');
  }
  @Get('crash')
  crash() {
    throw new Error('Server crashed!');
  }
}
