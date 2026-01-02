import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApiKeyService } from 'src/auth/api-key.service';

@Injectable()
export class apiKeyGuard implements CanActivate {
  constructor(private readonly apikeyService: ApiKeyService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const apikey = request.headers['x-api-key'];
    if (!apikey) {
      throw new UnauthorizedException('API key is missing');
    }
    if (!this.apikeyService.isValid(apikey)) {
      throw new UnauthorizedException('Invalid API key');
    }

    return true;
  }
}
