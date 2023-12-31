import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export enum ServiceRenewalType {
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

export class CreateServiceDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsNumber()
  price: number

  @IsNotEmpty()
  @IsEnum(ServiceRenewalType)
  renewal: ServiceRenewalType
}
