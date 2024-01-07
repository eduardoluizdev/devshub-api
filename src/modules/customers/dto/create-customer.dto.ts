import { CreateServiceDto } from '@/modules/services/dto/create-service.dto'
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator'

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

  @IsArray()
  @IsOptional()
  services: CreateServiceDto[] | undefined
}
