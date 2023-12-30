import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  @MinLength(11)
  phone: string

  @IsString()
  @IsNotEmpty()
  sector: string
}
