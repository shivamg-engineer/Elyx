import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MinLength,
  Min,
  Max,
  Matches,
  IsEmail,
  MaxLength,
} from "class-validator";
import { Trim,ToLower,EscapeHTML } from "../../../../auth/sanitize.ts";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(2253)
  @Matches(/^[A-Za-z\s]+$/, {
    message: "Name should contain only alphabets and spaces",
  })
  @Trim()
  @EscapeHTML()
  name!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ToLower()
  email!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @IsString()
  @IsNotEmpty()
  address!: string;
}
export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Trim()
  @EscapeHTML()
  name?: string;

  @IsOptional()
  @IsString()
  @Trim()
  @ToLower()
  email?: string;

  @IsOptional()
  @IsString()
  @Trim()
  phone?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  @Trim()
  address?: string;
}

export class PatchUserDto {
  @IsOptional()
  @IsString()
  @Trim()
  @EscapeHTML()
  name?: string;

  @IsOptional()
  @IsString()
  @Trim()
  @ToLower()
  email?: string;

  @IsOptional()
  @IsString()
  @Trim()
  phone?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  @Trim()
  address?: string;
}
