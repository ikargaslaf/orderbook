import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress, IsNotEmpty, IsOptional } from 'class-validator';

export class getOrdersDto {

    @ApiProperty()
    @IsOptional()
    @IsEthereumAddress()
    tokenA: string

    @ApiProperty()
    @IsOptional()
    @IsEthereumAddress()
    tokenB?: string

    @ApiProperty()
    @IsOptional()
    @IsEthereumAddress()
    user?: string
    
    @ApiProperty()
    @IsOptional()
    active?: boolean = false

}
