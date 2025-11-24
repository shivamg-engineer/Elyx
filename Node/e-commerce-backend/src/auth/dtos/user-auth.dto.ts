import { IsEmail, IsString, MinLength, IsNotEmpty } from "class-validator";
import { Transform } from "class-transformer";
import { Trim, ToLower, EscapeHTML } from "../../auth/sanitize.ts"

function capitalizeOne(value: unknown) {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
}

export class UserRegisterDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) =>
    capitalizeOne(value)
  )
  @Trim()
  @EscapeHTML()
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  @ToLower()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @Trim()
  phone!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @IsString()
  @IsNotEmpty()
  address!: string;
}

export class UserLoginDto {
  @IsEmail()
  @ToLower()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
