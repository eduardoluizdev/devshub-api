import {
  Controller,
  Post,
  Body,
  ParseUUIDPipe,
  Query,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common'
import { ServicesService } from './services/services.service'
import { CreateServiceDto } from './dto/create-service.dto'
import { UpdateServiceDto } from './dto/update-service.dto'

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  create(
    @Query('customerId', ParseUUIDPipe) customerId: string,
    @Body() createServiceDto: CreateServiceDto,
  ) {
    return this.servicesService.create(customerId, createServiceDto)
  }

  @Get()
  findAll(@Query('customerId', ParseUUIDPipe) customerId: string) {
    return this.servicesService.findAllByCustomerId(customerId)
  }

  @Put(':serviceId')
  update(
    @Param('serviceId', ParseUUIDPipe) serviceId: string,
    @Query('customerId', ParseUUIDPipe) customerId: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return this.servicesService.update(serviceId, customerId, updateServiceDto)
  }

  @Delete(':serviceId')
  remove(
    @Param('serviceId', ParseUUIDPipe) serviceId: string,
    @Query('customerId', ParseUUIDPipe) customerId: string,
  ) {
    return this.servicesService.remove(serviceId, customerId)
  }
}
