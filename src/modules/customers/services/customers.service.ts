import { ConflictException, Injectable } from '@nestjs/common'
import { CreateCustomerDto } from '../dto/create-customer.dto'
import { CustomersRepository } from '@/shared/database/repositories/customers.repositories'
import { ValidateCustomerOwnershipService } from './validation-customer-ownership.service'
import { UpdateCustomerDto } from '../dto/update-customer.dto'

@Injectable()
export class CustomersService {
  constructor(
    private readonly customersRepo: CustomersRepository,
    private readonly validateCustomerOwnership: ValidateCustomerOwnershipService,
  ) {}

  async create(userId: string, createCustomerDto: CreateCustomerDto) {
    const { name, email, phone, sector } = createCustomerDto

    const emailTaken = await this.customersRepo.findUnique({
      where: { email },
      select: { id: true },
    })

    if (emailTaken) {
      throw new ConflictException('This email is already in use.')
    }

    await this.customersRepo.create({
      data: {
        userId,
        name,
        email,
        phone,
        sector,
      },
    })

    return null
  }

  async findAllByUserId(userId: string) {
    const customers = await this.customersRepo.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        sector: true,
        services: {
          select: {
            id: true,
            name: true,
            price: true,
            renewal: true,
          },
        },
      },
    })

    return { customers }
  }

  async update(
    userId: string,
    customerId: string,
    updateCustomerDto: UpdateCustomerDto,
  ) {
    await this.validateCustomerOwnership.validate(userId, customerId)

    const { name, email, phone, sector } = updateCustomerDto

    await this.customersRepo.update({
      where: { id: customerId },
      data: { name, email, phone, sector },
    })

    return null
  }

  async remove(userId: string, customerId: string) {
    await this.validateCustomerOwnership.validate(userId, customerId)

    await this.customersRepo.delete({ where: { id: customerId } })

    return null
  }
}
