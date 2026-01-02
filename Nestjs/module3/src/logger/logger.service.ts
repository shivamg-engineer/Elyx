import { Inject, Injectable } from '@nestjs/common';
import { LOGGER_OPTIONS } from './logger.module';
import type { LoggerModuleOptions } from './logger.interface';

@Injectable()
export class LoggerService {
  
  constructor(
    @Inject(LOGGER_OPTIONS) private readonly options: LoggerModuleOptions,
  ) {}

  log(message: string) {
    console.log(`[${this.options.prefix}] ${message}`);
  }
}
