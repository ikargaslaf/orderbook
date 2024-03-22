import { Module } from '@nestjs/common';
import { ContractsModule } from './contracts/contracts.module';
import { OrdersModule } from './orders/orders.module';


@Module({
  imports: [ContractsModule, OrdersModule],
})
export class AppModule {}
