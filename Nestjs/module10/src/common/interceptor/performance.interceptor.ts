import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Logger } from 'winston';
import { AppLoggerService } from 'src/logger/logger.service';
import { Request } from 'express';

@Injectable()
export class PerformanceInterceptor implements NestInterceptor {
  constructor(private readonly logger: AppLoggerService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const start = Date.now();

    const req = context
      .switchToHttp()
      .getRequest<Request & { requestId?: string }>();
    const method = req?.method;
    const url = req?.originalUrl ?? req?.url;
    const requestId = req?.requestId;

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start;

        if (duration > 200) {
          this.logger.warn(
            `slow request detected`,
            `HTTP ${method} ${url} - ${duration}ms | requestId=${requestId}`,
          );
        } else {
          this.logger.debug(
            `Request execution time`,
            `HTTP ${method} ${url} - ${duration}ms | requestId=${requestId}`,
          );
        }

        const SLOW_REQUEST_THRESHOLD_MS = 500;

        if (duration > SLOW_REQUEST_THRESHOLD_MS) {
          this.logger.warn(
            'PERFORMANCE ALERT: Slow request detected',
            `HTTP ${method} ${url} - ${duration}ms | requestId=${requestId}`,
          );
        } else {
          this.logger.debug(
            'Request execution time',
            `HTTP ${method} ${url} - ${duration}ms | requestId=${requestId}`,
          );
        }
      }),
    );
  }
}
