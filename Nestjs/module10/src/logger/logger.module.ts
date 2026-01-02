import { Module } from '@nestjs/common';
import { AppLoggerService } from './logger.service';
import { LoggerController } from './logger.controller';

@Module({
  providers: [AppLoggerService],
  exports:[AppLoggerService],
  controllers: [LoggerController]
})
export class LoggerModule {}
