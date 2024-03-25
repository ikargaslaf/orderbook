import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column("text")
  orderId?: string;

  @Column()
  amountA: string

  @Column()
  amountB: string

  @Column()
  tokenA: string

  @Column()
  tokenB: string

  @Column()
  user: string

  @Column({
    nullable: true,
    default: false
  })
  isMarket: boolean

  @Column({
    nullable: true,
    default: false
  })
  isCanceled: boolean

}
