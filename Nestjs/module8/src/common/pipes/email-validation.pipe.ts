import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class EmailValidationPipe implements PipeTransform {
  transform(value: any) {
    // 1️⃣ Check if value exists
    if (!value) {
      throw new BadRequestException('Email is required');
    }

    // 2️⃣ Email regex (simple & safe)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 3️⃣ Validate format
    if (!emailRegex.test(value)) {
      throw new BadRequestException('invalid email format');
    }
  }
}
