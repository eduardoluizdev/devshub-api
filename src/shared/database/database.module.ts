import { Global, Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { UsersRepository } from './repositories/users.repositories'
import { CustomersRepository } from './repositories/customers.repositories'
import { ServicesRepository } from './repositories/services.repositories'

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepository,
    CustomersRepository,
    ServicesRepository,
  ],
  exports: [UsersRepository, CustomersRepository, ServicesRepository],
})
export class DatabaseModule {}
