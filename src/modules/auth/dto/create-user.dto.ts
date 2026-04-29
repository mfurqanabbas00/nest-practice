import { ApiBody, ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    description: 'Name of user should be unique',
    minimum: 2,
    maximum: 40,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(40)
  name: string;

  @ApiProperty()
  @IsNumber()
  age: number;

  @ApiProperty()
  @IsString()
  password: string;
  
}