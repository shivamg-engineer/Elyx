import { IsEmail, IsOptional, IsString, Length, Min, Max } from "class-validator";
import { Trim, ToLower, EscapeHTML } from "../../../../auth/sanitize.ts";

export class CreateVendorDto {

  @IsString()
  @Length(2, 2253)
  @Trim()
  @EscapeHTML()
  name!: string;

  @IsEmail()
  @Trim()
  @ToLower()
  email!: string;

  @IsString()
  @Length(8, 15)
  @Trim()
  phone!: string;

  @IsString()
  password!: string;

  @IsString()
  @Trim()
  storeName!: string;

  @IsString()
  @Trim()
  gstin!: string;

}
export class UpdateVendorDto {
  @IsOptional()
  @IsString()
  @Trim()
  @EscapeHTML()
  name?: string;

  @IsOptional()
  @IsEmail()
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
  storeName?: string;

  @IsOptional()
  @IsString()
  @Trim()
  gstin?: string;
}

export class PatchVendorDto {
  @IsOptional()
  @IsString()
  @Trim()
  @EscapeHTML()
  name?: string;

  @IsOptional()
  @IsEmail()
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
  storeName?: string;

  @IsOptional()
  @IsString()
  @Trim()
  gstin?: string;
}