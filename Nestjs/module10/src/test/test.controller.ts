import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppLoggerService } from '../logger/logger.service';
import { PerformanceInterceptor } from 'src/common/interceptor/performance.interceptor';

@Controller('test')
export class TestController {
  constructor(private readonly logger: AppLoggerService) {}

  @Get()
  getTest() {
    this.logger.log('Test endpoint called', 'TestController');
    return { message: 'Logger working!' };
  }

  @Get('slow')
  async slowEndpoint() {
    // ⏱ Artificial delay (800ms)
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { message: 'Slow response' };  
  }

  @Get('error')
  throwError() {
    throw new Error('Test failure');
  }
}
