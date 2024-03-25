import { IsEthereumAddress, IsNotEmpty } from 'class-validator';

export class OrderCreateDto {

    @IsNotEmpty()
    orderId: string;

    @IsNotEmpty()
    amountA: string

    @IsNotEmpty()
    amountB: string

    @IsNotEmpty()
    @IsEthereumAddress()
    tokenA: string

    @IsNotEmpty()
    @IsEthereumAddress()
    tokenB: string

    @IsNotEmpty()
    @IsEthereumAddress()
    user: string
    
    isMarket?: boolean

    isCanceled?: boolean
}
