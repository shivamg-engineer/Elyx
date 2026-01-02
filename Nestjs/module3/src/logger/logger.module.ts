import { type DynamicModule, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import type { LoggerModuleOptions } from './logger.interface';

export const LOGGER_OPTIONS = 'LOGGER_OPTIONS';

@Module({})
export class LoggerModule {
  static register(options: LoggerModuleOptions): DynamicModule {
    return {
      module: LoggerModule,
      providers: [
        {
          provide: LOGGER_OPTIONS,
          useValue: options,
        },
        LoggerService,
      ],
      exports: [LoggerService],
    };
  }
}
