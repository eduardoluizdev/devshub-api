import { Module } from '@nestjs/common'
import { ServicesService } from './services/services.service'
import { ServicesController } from './services.controller'
import { ValidateCustomerServiceOwnershipService } from './services/validation-customer-service-ownership.service'

@Module({
  controllers: [ServicesController],
  providers: [ServicesService, ValidateCustomerServiceOwnershipService],
})
export class ServicesModule {}
