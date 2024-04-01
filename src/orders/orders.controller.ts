import { Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { getOrdersDto } from 'src/dto/get-orders.dto';
import { getMatchingOrdersDto } from 'src/dto/get-matching-orders.dto';
import { getMatchingOrdersDecorator, getOrdersDecorator } from './orders.decorators';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
    constructor(
        private orderService: OrdersService
    ) {}

    @Get('/getOrders')
    @getOrdersDecorator()
    async getOrders(
        @Query() query?: getOrdersDto
    ) {
        return this.orderService.findOrders(
            query.tokenA,
            query.tokenB,
            query.user,
            query.active
        )
    }

    @Get('/getMatchingOrders')
    @getMatchingOrdersDecorator()
    async getMatchingOrders(
        @Query() query: getMatchingOrdersDto
    ) {
        return this.orderService.findMatchingOrdersIds(
            query.tokenA,
            query.tokenB,
            query.amountA,
            query.amountB
        )
    }
}
