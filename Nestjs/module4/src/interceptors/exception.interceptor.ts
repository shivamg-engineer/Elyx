import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Something went wrong';

        // If error is a known HTTP exception
        if (error instanceof HttpException) {
          status = error.getStatus();
          const response = error.getResponse();

          message =
            typeof response === 'string'
              ? response
              : (response as any).message || message;
        }

        //Final clean response format
        const formattedError = {
          success: false,   
          message,
          error: HttpStatus[status],
        };

        return throwError(() => formattedError);
      }),
    );
  }
}
