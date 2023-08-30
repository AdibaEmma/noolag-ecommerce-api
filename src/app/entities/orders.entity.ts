/* eslint-disable prettier/prettier */
import { Model, Column, Table, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, HasMany, DataType } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './users.entity';
import { OrderItem } from './order-items.entity';
import { OrderStatus, PaymentMethod, PaymentStatus } from '@app/enums';
import { UUID } from 'crypto';
import { Transaction } from './transactions.entity';

@Table
export class Order extends Model<Order> {
  @PrimaryKey
  @AutoIncrement
  @Column
  @ApiProperty({ example: 1, description: 'id of the order' })
  id: number;

  @ForeignKey(() => User)
  @BelongsTo(() => User, { as: 'userAssociation' })
  @ApiProperty({ example: 1, description: 'id of the user' })
  userId: number;

  @ForeignKey(() => Transaction)
  @BelongsTo(() => Transaction, { as: 'transactionAssociation' })
  transactionId: UUID

  @Column({ type: 'DECIMAL(10, 2)', allowNull: false })
  @ApiProperty({ example: 5245.0, description: 'total cost of the order' })
  totalCost: number

  @Column
  @ApiProperty({ example: 'Legon, Accra, Ghana', description: 'shipping address of the order' })
  shippingAddress: string;

  @Column
  @ApiProperty({ example: 'Legon, Accra, Ghana', description: 'billing address of the order' })
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

  @Column({ type: 'text' })
  notes: string;

  @Column({ type: 'DECIMAL(10, 2)' })
  discountAmount: number;

  @Column({ type: 'DECIMAL(10, 2)' })
  taxAmount: number;

  @Column({ type: 'DECIMAL(10, 2)' })
  shippingFee: number;


  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  isDeleted: boolean;
}
