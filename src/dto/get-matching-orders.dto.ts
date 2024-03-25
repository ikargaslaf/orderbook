import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress, IsNotEmpty, IsOptional } from 'class-validator';

export class getMatchingOrdersDto {

    @ApiProperty()
    @IsEthereumAddress()
    tokenA: string

    @ApiProperty()
    @IsEthereumAddress()
    tokenB: string

    @ApiProperty()
    amountA: string

    @ApiProperty()
    amountB: string

}
