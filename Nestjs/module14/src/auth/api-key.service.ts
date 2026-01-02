import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiKeyService {
  private readonly validKeys = new Set(['key-123', 'key-456']);

  isValid(apikey: string): boolean {
    return this.validKeys.has(apikey);
  }
}
