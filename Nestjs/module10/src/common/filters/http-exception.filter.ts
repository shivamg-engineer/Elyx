import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  LoggerService,
} from '@nestjs/common';
import { AppLoggerService } from 'src/logger/logger.service';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
   constructor(private readonly logger: AppLoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request & { requestId?: string }>();
    const res = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';

    // 🔴 LOG THE ERROR (THIS IS THE EXERCISE)
    this.logger.error(
      message,
      (exception as any)?.stack,
      `HTTP ${req.method} ${req.originalUrl} ------|------ requestId=${req.requestId}`,
    );

    res.status(status).json({
      statusCode: status,
      message,
      requestId: req.requestId,
    });
  }
}
