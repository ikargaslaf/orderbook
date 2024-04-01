import { applyDecorators } from "@nestjs/common";
import { ApiQuery } from "@nestjs/swagger";

export const getOrdersDecorator = () => {
    return applyDecorators(
        ApiQuery({ name: 'tokenA', required: false }),
        ApiQuery({ name: 'tokenB', required: false }),
        ApiQuery({ name: 'user', required: false }),
        ApiQuery({ name: 'active', required: false }),
    );
}

export const getMatchingOrdersDecorator = () => {
    return applyDecorators(
        ApiQuery({ name: 'tokenA' }),
        ApiQuery({ name: 'tokenB' }),
        ApiQuery({ name: 'amountA' }),
        ApiQuery({ name: 'amountB' })
    )
}