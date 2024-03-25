import { Module } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  providers: [ContractsService],
  imports: [OrdersModule]
})
export class ContractsModule {}
