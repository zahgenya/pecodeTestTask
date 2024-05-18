import { IsNotEmpty, IsString } from 'class-validator';

export class createUserPostDto {
  @IsString()
  @IsNotEmpty()
  body: string;
}
