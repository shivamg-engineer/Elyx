import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    const Var = 3;
    console.log(Var);
    if (1 == '1') {
      return this.appService.getHello();
    }
  }
}
