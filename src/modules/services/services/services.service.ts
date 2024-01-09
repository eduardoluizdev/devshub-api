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

  async create(
    userId: string,
    customerId: string,
    createServiceDto: CreateServiceDto,
  ) {
    if (customerId) {
      const isCustomerExists = await this.customerAlreadyExists(
        customerId,
        userId,
      )

      if (!isCustomerExists) {
        throw new NotFoundException('Customer not found.')
      }
    }

    const { name, price, renewal } = createServiceDto

    await this.servicesRepo.create({
      data: {
        name,
        price,
        renewal,
        customerId: customerId ? customerId : undefined,
        userId,
      },
    })

    return null
  }

  async findAll(userId: string) {
    const services = await this.servicesRepo.findMany({
      where: {
        OR: [
          {
            customer: {
              userId,
            },
          },
          {
            customerId: null,
          },
        ],
      },
      select: {
        id: true,
        name: true,
        price: true,
        renewal: true,
        customer: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return { services }
  }

  async findAllByCustomerId(userId: string, customerId: string) {
    const isCustomerExists = await this.customerAlreadyExists(
      customerId,
      userId,
    )

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
    userId: string,
    serviceId: string,
    customerId: string,
    updateServiceDto: UpdateServiceDto,
  ) {
    if (customerId) {
      const isCustomerExists = await this.customerAlreadyExists(
        customerId,
        userId,
      )

      if (!isCustomerExists) {
        throw new NotFoundException('Customer not found.')
      }

      await this.validateCustomerServiceOwnership.validate(
        customerId,
        serviceId,
      )
    }

    const { name, price, renewal } = updateServiceDto

    await this.servicesRepo.update({
      where: { id: serviceId, userId },
      data: {
        name,
        price,
        renewal,
      },
    })

    return null
  }

  async remove(userId: string, serviceId: string, customerId: string) {
    if (customerId) {
      const isCustomerExists = await this.customerAlreadyExists(
        customerId,
        userId,
      )

      if (!isCustomerExists) {
        throw new NotFoundException('Customer not found.')
      }

      await this.validateCustomerServiceOwnership.validate(
        customerId,
        serviceId,
      )
    }

    await this.servicesRepo.delete({ where: { id: serviceId, userId } })

    return null
  }

  private async customerAlreadyExists(customerId: string, userId: string) {
    const customer = await this.customersRepo.findUnique({
      where: {
        id: customerId,
        userId,
      },
    })

    return !!customer
  }
}
