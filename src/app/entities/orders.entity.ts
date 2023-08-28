/* eslint-disable prettier/prettier */
import {Model, Column, Table, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, HasMany, DataType} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './users.entity';
import { OrderItem } from './order-items.entity';
import { OrderStatus, PaymentMethod, PaymentStatus } from '@app/enums';

@Table
export class Order extends Model<Order> {
  @PrimaryKey
  @AutoIncrement
  @Column
  @ApiProperty({ example: 1, description: 'id of the order' })
  id: number;

  @ForeignKey(() => User)
  @BelongsTo(() => User, {as: 'userAssociation'})
  userId: number;

  @Column({ type: 'DECIMAL(10, 2)', allowNull: false })
  totalCost: number

  @Column
  shippingAddress: string;

  @Column
  billingAddress: string;

  @HasMany(() => OrderItem)
  orderItems: OrderItem[];

  @Column({
    type: DataType.ENUM(...Object.values(PaymentMethod)),
  })
  paymentMethod: PaymentMethod;

  @Column({
    type: DataType.ENUM(...Object.values(PaymentStatus)),
    defaultValue: PaymentStatus.Pending
  })
  paymentStatus: PaymentStatus;

  @Column({
    type: DataType.ENUM(...Object.values(OrderStatus)),
    defaultValue: OrderStatus.Pending
  })
  orderStatus: OrderStatus;

  @Column
  trackingNumber: string;

  @Column({type: 'text'})
  notes: string;

  @Column
  discountAmount: number;

  @Column
  taxAmount: number;

  @Column
  shippingFee: number;


  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  isDeleted: boolean;
}
