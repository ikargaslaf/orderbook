import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from './orders-item.entity';
import { Repository } from 'typeorm';
import { OrderCreateDto } from 'src/dto/order-create.dto';
import { OrderMatchedDto } from 'src/dto/order-matched.dto';

@Injectable()
export class OrdersService {

    constructor(
        @InjectRepository(OrderItem)
        private orderRepository: Repository<OrderItem>
    ) {}

    async create(order: OrderCreateDto): Promise<OrderItem> {
        return this.orderRepository.save(order)
    }

    async match(order: OrderMatchedDto): Promise<OrderItem>{

        const matchingOrder = await this.orderRepository.findOne({
            where: {
                orderId: order.orderId
            }
        })

        matchingOrder.isCanceled = order.amountLeftToFill == matchingOrder.amountA ? true : false

        return this.orderRepository.save(matchingOrder)
    }

    async cancel(orderId: string){
        return this.orderRepository.update({
            orderId: orderId
        }, {
            isCanceled: true
        })
    }
}
