import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEmail, MinLength } from "class-validator";

export class CreateVendorDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "John" })
  name: string; // 👈 added

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "Nyra" })
  store_name: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "Nyra@example.com" })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "+919999999999" })
  phone: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  @ApiProperty({ example: "Nyra@123" })
  password: string;

  @IsString()
  @ApiProperty({ example: "GSTIN453454" })
  gstin?: string;
}
