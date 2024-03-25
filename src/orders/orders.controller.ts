import { Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { getOrdersDto } from 'src/dto/get-orders.dto';
import { getMatchingOrdersDto } from 'src/dto/get-matching-orders.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
    constructor(
        private orderService: OrdersService
    ) {}

    @Get('/getOrders')
    @ApiQuery({ name: 'tokenA', required: false })
    @ApiQuery({ name: 'tokenB', required: false })
    @ApiQuery({ name: 'user', required: false })
    @ApiQuery({ name: 'active', required: false, })
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
    @ApiQuery({ name: 'tokenA' })
    @ApiQuery({ name: 'tokenB' })
    @ApiQuery({ name: 'amountA' })
    @ApiQuery({ name: 'amountB' })
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
