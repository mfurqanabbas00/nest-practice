import { IsNumber, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class LoginUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(40)
  name: string;

  @IsString()
  password: string;
  
}