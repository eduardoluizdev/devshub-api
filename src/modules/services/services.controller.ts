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
import { ActiveUserId } from '@/shared/decorators/ActiveUserId'

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Query(
      'customerId',
      new ParseUUIDPipe({
        optional: true,
      }),
    )
    customerId?: string | undefined,
    @Body() createServiceDto?: CreateServiceDto,
  ) {
    return this.servicesService.create(userId, customerId, createServiceDto)
  }

  @Get('me')
  findAll(@ActiveUserId() userId: string) {
    return this.servicesService.findAll(userId)
  }

  @Get()
  findAllByCustomerId(
    @ActiveUserId() userId: string,
    @Query('customerId', ParseUUIDPipe) customerId: string,
  ) {
    return this.servicesService.findAllByCustomerId(userId, customerId)
  }

  @Put(':serviceId')
  update(
    @ActiveUserId() userId: string,
    @Param('serviceId', ParseUUIDPipe) serviceId: string,
    @Query('customerId', ParseUUIDPipe) customerId: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return this.servicesService.update(
      userId,
      serviceId,
      customerId,
      updateServiceDto,
    )
  }

  @Delete(':serviceId')
  remove(
    @ActiveUserId() userId: string,
    @Param('serviceId', ParseUUIDPipe) serviceId: string,
    @Query(
      'customerId',
      new ParseUUIDPipe({
        optional: true,
      }),
    )
    customerId: string,
  ) {
    return this.servicesService.remove(userId, serviceId, customerId)
  }
}
