import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class TrimPipe implements PipeTransform {
  transform(value: any) {
    // If it's a string → trim it
    if (typeof value === 'string') {
      return value.trim();
    }

    // If it's an object (like request body) → trim all string fields
    if (typeof value === 'object' && value !== null) {
      const trimmedObject: any = {};

      for (const key in value) {
        const item = value[key];
        trimmedObject[key] =
          typeof item === 'string' ? item.trim() : item;
      }

      return trimmedObject;
    }

    return value;
  }
}
