import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'

import { DatabaseModule } from './shared/database/database.module'
import { AuthModule } from './modules/auth/auth.module'
import { AuthGuard } from './modules/auth/auth.guard'
import { UsersModule } from './modules/users/users.module'
import { CustomersModule } from './modules/customers/customers.module'
import { ServicesModule } from './modules/services/services.module'

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    CustomersModule,
    ServicesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
