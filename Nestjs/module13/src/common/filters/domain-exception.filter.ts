import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {Response} from 'express';
import { UserNotFoundError } from '../errors/user.errors';

@Catch()
export class domainExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
     console.log('[Domain Exception Filter]🧯 Filter caught:', exception);

    const response = host.switchToHttp().getResponse<Response>();

    // Domain error → HTTP
    if (exception instanceof UserNotFoundError) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message: exception.message,
      });
    }

    // Fallback for HttpException
    if (exception instanceof HttpException) {
      return response
        .status(exception.getStatus())
        .json(exception.getResponse());
    }

    // Unknown error
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error',
    });
  }
}
