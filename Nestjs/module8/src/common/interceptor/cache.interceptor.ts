import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

// Simple in-memory cache (for demo)
const cache = new Map<string, any>();

// TTL in milliseconds (e.g. 10 seconds)
const CACHE_TTL = 10 * 1000;

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    
    const request = context.switchToHttp().getRequest();
    const key = `${request.method}:${request.url}`;
    const now = Date.now();

    const cached = cache.get(key);

    // 1️⃣ Return cached response if exists
    // if (cache.has(key)) {
    //   console.log('⚡ Returning cached response for:', key);
    //   return of(cache.get(key));
    // }

    if (cached && cached.expiresAt > now) {
      console.log('⚡ Returning cached response');
      return of(cached.value);
    }

    // 2️⃣ If cache exists but expired → delete it
    if (cached && cached.expiresAt <= now) {
      console.log('🗑️ Cache expired, deleting');
      cache.delete(key);
    }

    // 3️⃣ Otherwise process request & cache response
    return next.handle().pipe(
      tap((data) => {
        cache.set(key, {
          value: data,
          expiresAt: now + CACHE_TTL,
        });
        console.log('💾 Caching response for:', key);
        console.log('💾 Caching response with TTL');
      }),
    );
  }
}
