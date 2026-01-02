import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginVendorDto {
  @IsEmail()
  @IsString()
  @ApiProperty({ example: "vendor3@example.com" })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "Vendor3@123" })
  password: string;
}
