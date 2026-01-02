import { Injectable, LoggerService, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';
import { AppLoggerService } from '../../logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: AppLoggerService) {}

  use(
    req: Request & { requestId?: string },
    res: Response,
    next: NextFunction,
  ) {
    // 🔑 Attach request ID
    const requestId = randomUUID();
    req.requestId = requestId;

    const { method, originalUrl } = req;
    const startTime = Date.now();

    // 📥 Incoming request
    this.logger.log(
      `Incoming request`,
      `HTTP ${method} ${originalUrl} | requestId=${requestId}`,
    );

    res.on('finish', () => {
      const duration = Date.now() - startTime;

      // 📤 Outgoing response
      this.logger.log(
        `Request completed`,
        `HTTP ${method} ${originalUrl} ${res.statusCode} - ${duration}ms | requestId=${requestId}`,
      );
    });

    next();
  }
}
