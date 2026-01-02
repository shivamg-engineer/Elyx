import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsPhoneNumber,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    example: "John Doe",
    description: "Full name of the user",
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    example: "john.doe@example.com",
    description: "Email address of the user",
    type: String,
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: "+919876543210",
    description: "Phone number of the user (Indian format)",
    type: String,
  })
  @IsPhoneNumber("IN")
  phone!: string;

  @ApiProperty({
    example: "securePassword123",
    description: "Password for the user account (minimum 6 characters)",
    type: String,
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiProperty({
    example: "123 Main Street, City, State 123456",
    description: "Home address of the user",
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  address!: string;
}
