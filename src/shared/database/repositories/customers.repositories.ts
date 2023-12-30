import { Injectable } from '@nestjs/common'
import { type Prisma } from '@prisma/client'

import { PrismaService } from '../prisma.service'

@Injectable()
export class CustomersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findMany<T extends Prisma.CustomerFindManyArgs>(
    findManyDto: Prisma.SelectSubset<T, Prisma.CustomerFindManyArgs>,
  ) {
    return this.prismaService.customer.findMany(findManyDto)
  }

  findFirst(findFirstDto: Prisma.CustomerFindFirstArgs) {
    return this.prismaService.customer.findFirst(findFirstDto)
  }

  findUnique(findUniqueDto: Prisma.CustomerFindUniqueArgs) {
    return this.prismaService.customer.findUnique(findUniqueDto)
  }

  create(createDto: Prisma.CustomerCreateArgs) {
    return this.prismaService.customer.create(createDto)
  }

  update(updateDto: Prisma.CustomerUpdateArgs) {
    return this.prismaService.customer.update(updateDto)
  }

  delete(deleteDto: Prisma.CustomerDeleteArgs) {
    return this.prismaService.customer.delete(deleteDto)
  }
}
