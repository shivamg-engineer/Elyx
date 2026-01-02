import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
  @ApiProperty({
    example: "john.doe@example.com",
    description: "Email address of the registered user",
    type: String,
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: "securePassword123",
    description: "Password for the user account",
    type: String,
  })
  @IsString()
  password!: string;
}
