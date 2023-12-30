import { Module } from '@nestjs/common'
import { CustomersService } from './services/customers.service'
import { CustomersController } from './customers.controller'
import { ValidateCustomerOwnershipService } from './services/validation-customer-ownership.service'

@Module({
  controllers: [CustomersController],
  providers: [CustomersService, ValidateCustomerOwnershipService],
})
export class CustomersModule {}
