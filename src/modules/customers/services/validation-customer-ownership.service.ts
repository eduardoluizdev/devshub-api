import { Injectable, NotFoundException } from '@nestjs/common'
import { CustomersRepository } from '@/shared/database/repositories/customers.repositories'

@Injectable()
export class ValidateCustomerOwnershipService {
  constructor(private readonly customersRepo: CustomersRepository) {}

  async validate(userId: string, customerId: string) {
    const isOwner = await this.customersRepo.findFirst({
      where: { id: customerId, userId },
    })

    if (!isOwner) {
      throw new NotFoundException('Customer not found.')
    }
  }
}
