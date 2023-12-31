import { ServicesRepository } from '@/shared/database/repositories/services.repositories'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class ValidateCustomerServiceOwnershipService {
  constructor(private readonly serviceRepo: ServicesRepository) {}

  async validate(customerId: string, serviceId: string) {
    const isOwner = await this.serviceRepo.findFirst({
      where: { id: serviceId, customerId },
    })

    if (!isOwner) {
      throw new NotFoundException('Customer not found.')
    }
  }
}
