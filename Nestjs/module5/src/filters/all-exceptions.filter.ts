import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    let message: string | string[] =
      'Something went wrong. Please try again later.';

    if (exception instanceof HttpException) {
      status = exception.getStatus();

      const errorResponse = exception.getResponse();

      message =
        typeof errorResponse === 'string'
          ? errorResponse
          : (errorResponse as any).message || message;
    }

    // ✅ ✅ GLOBAL ERROR LOGGING
    console.error('❌ ERROR LOG START ❌');
    console.error('Time:', new Date().toISOString());
    console.error('Path:', request.method, request.url);
    console.error('Status:', status);
    console.error('Message:', message);
    console.error('Full Exception:', exception);
    console.error('❌ ERROR LOG END ❌');

    response.status(status).json({
      success: false,
      statusCode: status,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}

// ✅ 1. Known Error (400)
// GET http://localhost:3000/test/bad

// ✅ 2. Unknown Error (500)
// GET http://localhost:3000/test/crash
