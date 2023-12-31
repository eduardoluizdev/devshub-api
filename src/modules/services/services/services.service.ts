import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateServiceDto } from '../dto/create-service.dto'
import { ValidateCustomerServiceOwnershipService } from './validation-customer-service-ownership.service'
import { ServicesRepository } from '@/shared/database/repositories/services.repositories'
import { UpdateServiceDto } from '../dto/update-service.dto'
import { CustomersRepository } from '@/shared/database/repositories/customers.repositories'

@Injectable()
export class ServicesService {
  constructor(
    private readonly servicesRepo: ServicesRepository,
    private readonly customersRepo: CustomersRepository,
    private readonly validateCustomerServiceOwnership: ValidateCustomerServiceOwnershipService,
  ) {}

  async create(customerId: string, createServiceDto: CreateServiceDto) {
    const isCustomerExists = await this.customerAlreadyExists(customerId)

    if (!isCustomerExists) {
      throw new NotFoundException('Customer not found.')
    }

    const { name, price, renewal } = createServiceDto

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
    const isCustomerExists = await this.customerAlreadyExists(customerId)

    if (!isCustomerExists) {
      throw new NotFoundException('Customer not found.')
    }

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
    const isCustomerExists = await this.customerAlreadyExists(customerId)

    if (!isCustomerExists) {
      throw new NotFoundException('Customer not found.')
    }

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
    const isCustomerExists = await this.customerAlreadyExists(customerId)

    if (!isCustomerExists) {
      throw new NotFoundException('Customer not found.')
    }

    await this.validateCustomerServiceOwnership.validate(customerId, serviceId)

    await this.servicesRepo.delete({ where: { id: serviceId } })

    return null
  }

  private async customerAlreadyExists(customerId: string) {
    const customer = await this.customersRepo.findUnique({
      where: { id: customerId },
    })

    return !!customer
  }
}
