import { Controller, Get } from '@nestjs/common'
import { StatusService } from './status.service'
import { IsPublic } from '@/shared/decorators/IsPublic'

@IsPublic()
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  status() {
    return this.statusService.status()
  }
}
