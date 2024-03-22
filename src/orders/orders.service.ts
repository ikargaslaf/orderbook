import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { Repository } from 'typeorm';
import { OrderCreateDto } from 'src/dto/order-create.dto';
import { OrderMatchedDto } from 'src/dto/order-matched.dto';

@Injectable()
export class OrdersService {

    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>
    ) {}

    async create(order: OrderCreateDto): Promise<Order> {
        return this.orderRepository.save(order)
    }

    async match(order: OrderMatchedDto): Promise<Order>{

        const matchingOrder = await this.orderRepository.findOne({
            where: {
                orderId: order.orderId
            }
        })

        matchingOrder.amountLeftToFill = order.amountLeftToFill
        matchingOrder.isCancelled = order.amountLeftToFill == matchingOrder.amountA ? true : false

        return this.orderRepository.save(matchingOrder)
    }

    async cancel(orderId: string){
        return this.orderRepository.update(orderId, {
            isCancelled: true
        })
    }
}
