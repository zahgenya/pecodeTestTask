import { IsNotEmpty, IsString } from "class-validator";

export class loginDto {
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}