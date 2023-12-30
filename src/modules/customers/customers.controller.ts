import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  Delete,
} from '@nestjs/common'
import { CustomersService } from './services/customers.service'
import { ActiveUserId } from '@/shared/decorators/ActiveUserId'
import { CreateCustomerDto } from './dto/create-customer.dto'
import { UpdateCustomerDto } from './dto/update-customer.dto'

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @ActiveUserId() userId: string,
    @Body() createCustomerDto: CreateCustomerDto,
  ) {
    return this.customersService.create(userId, createCustomerDto)
  }

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.customersService.findAllByUserId(userId)
  }

  @Put(':customerId')
  @HttpCode(HttpStatus.OK)
  update(
    @ActiveUserId() userId: string,
    @Param('customerId', ParseUUIDPipe) customerId: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(userId, customerId, updateCustomerDto)
  }

  @Delete(':customerId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @ActiveUserId() userId: string,
    @Param('customerId', ParseUUIDPipe) customerId: string,
  ) {
    return this.customersService.remove(userId, customerId)
  }
}
