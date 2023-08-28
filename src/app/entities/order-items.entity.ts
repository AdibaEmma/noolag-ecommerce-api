import {ApiProperty} from '@nestjs/swagger';
import {AutoIncrement, BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table} from 'sequelize-typescript';
import {Product} from './products.entity';
import {Order} from './orders.entity';

@Table
export class OrderItem extends Model<OrderItem> {
  @PrimaryKey
  @AutoIncrement
  @Column
  @ApiProperty({example: 1, description: 'id of the orderItem'})
  id: number;

  @ForeignKey(() => Order)
  @BelongsTo(() => Order, {as: 'orderAssociation'})
  orderId: number;

  @ForeignKey(() => Product)
  @BelongsTo(() => Product, {as: 'productAssociation'})
  productId: number;

  @Column
  quantity: number;

  @Column({type: 'DECIMAL(10, 2)', allowNull: false})
  subtotal: number;
}
