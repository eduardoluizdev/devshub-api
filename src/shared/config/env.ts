import { plainToInstance } from 'class-transformer'
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  NotEquals,
  validateSync,
} from 'class-validator'

class Env {
  @IsString()
  @IsNotEmpty()
  dbURL: string

  @IsString()
  @IsNotEmpty()
  @NotEquals('unsecure_jwt_secret')
  jwtSecret: string

  @IsNumber()
  @IsNotEmpty()
  port: number

  @IsString()
  @IsNotEmpty()
  corsOrigin: 'http://localhost:3000' | 'https://app.devshub.io'
}

export const env: Env = plainToInstance(Env, {
  dbURL: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  port: Number(process.env.PORT),
  corsOrigin: process.env.CORS_ORIGIN,
})

const errors = validateSync(env)

if (errors.length > 0) {
  throw new Error(JSON.stringify(errors, null, 2))
}
