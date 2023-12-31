import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateServiceDto } from '../dto/create-service.dto'
import { ValidateCustomerServiceOwnershipService } from './validation-customer-service-ownership.service'
import { ServicesRepository } from '@/shared/database/repositories/services.repositories'
import { UpdateServiceDto } from '../dto/update-service.dto'

@Injectable()
export class ServicesService {
  constructor(
    private readonly servicesRepo: ServicesRepository,
    private readonly validateCustomerServiceOwnership: ValidateCustomerServiceOwnershipService,
  ) {}

  async create(customerId: string, createServiceDto: CreateServiceDto) {
    const { name, price, renewal } = createServiceDto

    if (!customerId) {
      throw new NotFoundException('Customer not found.')
    }

    await this.servicesRepo.create({
      data: {
        customerId,
        name,
        price,
        renewal,
      },
    })

    return null
  }

  async findAllByCustomerId(customerId: string) {
    const services = await this.servicesRepo.findMany({
      where: { customerId },
      select: {
        id: true,
        name: true,
        price: true,
        renewal: true,
        createdAt: true,
      },
    })

    return { services }
  }

  async update(
    serviceId: string,
    customerId: string,
    updateServiceDto: UpdateServiceDto,
  ) {
    await this.validateCustomerServiceOwnership.validate(customerId, serviceId)

    const { name, price, renewal } = updateServiceDto

    await this.servicesRepo.update({
      where: { id: serviceId },
      data: {
        name,
        price,
        renewal,
      },
    })

    return null
  }

  async remove(serviceId: string, customerId: string) {
    await this.validateCustomerServiceOwnership.validate(customerId, serviceId)

    await this.servicesRepo.delete({ where: { id: serviceId } })

    return null
  }
}
