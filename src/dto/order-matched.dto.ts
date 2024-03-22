import { IsEthereumAddress, IsNotEmpty } from 'class-validator';

export class OrderMatchedDto {

    @IsNotEmpty()
    orderId: string;

    @IsNotEmpty()
    amountLeftToFill: string

}
