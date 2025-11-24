import { Transform } from "class-transformer";
import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsPhoneNumber,
  Matches,
} from "class-validator";
import { Trim, ToLower, EscapeHTML } from "../../auth/sanitize.ts"
function capitalizeOne(value: unknown) {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  // return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
  return trimmed.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
}


export class VendorRegisterDto {
  @IsString()
  @Transform(
    ({ value }) => capitalizeOne(value)
  )
  @EscapeHTML()
  name!: string;

  @Transform(({ value }) => value.toLowerCase())
  @IsEmail()
  @Trim()
  @ToLower()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  // @IsPhoneNumber("IN")
  @Matches(/^\+[1-9]\d{1,14}$/, {
    message: "Phone must be in E.164 format (+1234567890)",
  })
  @Trim()
  @EscapeHTML()
  phone!: string;

  @IsString()
  @Transform(({ value }) =>
    value ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : value
  )
  @Trim()
  storeName!: string;

  @IsOptional()
  @IsString()
  @Trim()
  gstin?: string;
}

export class VendorLoginDto {
  @IsEmail()
  @Trim()
  @ToLower()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}
