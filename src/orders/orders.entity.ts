import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  orderId?: string;

  @Column()
  amountA: string

  @Column()
  amountB: string

  @Column()
  amountLeftToFill: string

  @Column()
  fees: string
  
  @Column()
  tokenA: string

  @Column()
  tokenB: string

  @Column()
  user: string

  @Column()
  isCancelled: boolean

}
