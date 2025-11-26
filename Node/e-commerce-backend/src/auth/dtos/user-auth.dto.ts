import { IsEmail, IsString, MinLength, IsNotEmpty } from "class-validator";
import { Transform } from "class-transformer";
import { Trim, ToLower, EscapeHTML } from "../../auth/sanitize.ts"

function capitalizeOne(value: unknown) {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  return trimmed.split(" ").map((word:string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
}

export class UserRegisterDto {
  @IsString()
  @MinLength(2, { message: "Field must not be an invalid" })
  @IsNotEmpty({ message: "Field cannot be empty" })
  @Trim()
  @EscapeHTML()
  @Transform(({ value }) =>
    capitalizeOne(value)
  )
  name!: string;

  @IsEmail()
  @IsNotEmpty({ message: "Field cannot be empty" })
  @ToLower()
  email!: string;

  @IsString()
  @IsNotEmpty({ message: "Field cannot be empty" })
  @Trim()
  phone!: string;

  @IsString()
  @IsNotEmpty({ message: "Field cannot be empty" })
  @MinLength(6, { message: "Password length must not be less than 6" })
  password!: string;

  @IsString()
  @IsNotEmpty({ message: "Field cannot be empty" })
  address!: string;
}

export class UserLoginDto {
  @IsEmail()
  @ToLower()
  @IsNotEmpty({ message: "Field cannot be empty" })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: "Field cannot be empty" })
  password!: string;
}
