import { BadRequestException, Controller, Get } from '@nestjs/common';

@Controller('test')
export class TestController {
  @Get('error')
  getError() {
    throw new BadRequestException('Invalid input data');
  }
}
