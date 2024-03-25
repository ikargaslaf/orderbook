import { OrderCreateDto } from "src/dto/order-create.dto";
import { OrderMatchedDto } from "src/dto/order-matched.dto";


export function toCreateOrderDto(event: any){

    const dto: OrderCreateDto = {
        
        orderId: event.args.id.toString(),
        amountA: event.args.amountA.toString(),
        amountB: event.args.amountB.toString(),
        tokenA: event.args.tokenA,
        tokenB: event.args.tokenB,
        user: event.args.user,
        isMarket: event.args.isMarket,
        isCanceled: false
    }
    
    return dto
}

export function toMatchedOrderDto(event: any){

    const dto: OrderMatchedDto = {
        
        orderId: event.args.id.toString(),
        amountLeftToFill: event.args.amountLeftToFill.toString(),
        
    }
    
    return dto
}

