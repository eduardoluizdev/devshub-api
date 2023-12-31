import 'dotenv/config'

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { env } from './shared/config/env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({ origin: env.corsOrigin })

  await app.listen(env.port)
}

bootstrap()
