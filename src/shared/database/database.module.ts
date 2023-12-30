import { Global, Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { UsersRepository } from './repositories/users.repositories'
import { CustomersRepository } from './repositories/customers.repositories'

@Global()
@Module({
  providers: [PrismaService, UsersRepository, CustomersRepository],
  exports: [UsersRepository, CustomersRepository],
})
export class DatabaseModule {}
