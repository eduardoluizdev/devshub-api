import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: ['warn', 'error'],
      errorFormat: 'pretty',
    })
  }
  onModuleDestroy() {
    throw new Error('Method not implemented.')
  }

  onModuleInit() {
    return this.$connect()
  }

  OnModuleDestroy() {
    return this.$disconnect()
  }
}
