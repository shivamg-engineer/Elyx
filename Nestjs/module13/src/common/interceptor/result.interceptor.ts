import {
    BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Err } from '../monads';
import { UserNotFoundError } from '../errors/user.errors';
import { DomainError } from '../errors/domain-error';

@Injectable()
export class ResultInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((result) => {
         console.log('[Result Interceptor]📦 Controller returned:', result);
        /*
        // ❌ Failure path
        if (result?.type === 'err') {
          throw new NotFoundException(result.error);
        }

        // ✅ Success path
        if (result?.type === 'ok') {
          return result.value;
        }
          */
        //------------custome error
        if (result?.type === 'err') {
           console.log('[Result Interceptor]📦 Controller returned:', result);
          const error = result.error;

          // Domain → HTTP mapping
          if (error instanceof UserNotFoundError) {
            throw new NotFoundException(error.message);
          }

          if (error instanceof DomainError) {
            throw new BadRequestException(error.message);
          }

          throw error; // fallback
        }
        //custom error


        // Success path
        if (result?.type === 'ok') {
           console.log('✅ Unwrapping Ok');
          return result.value;
        }

        // Non-Result responses pass through
        return result;
      }),
    );
  }
}
