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
  @ApiProperty({ example: 1, description: 'transaction id for transaction associated with order' })
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
  @ApiProperty({ example: [{productId: 1, quantity: 5}], description: 'Items added to order' })
  orderItems: OrderItem[];

  @Column({
    type: DataType.ENUM(...Object.values(PaymentMethod)),
  })
  @ApiProperty({ example: 'bank', description: 'Payment method to be associated with transaction' })
  paymentMethod: PaymentMethod;

  @Column({
    type: DataType.ENUM(...Object.values(PaymentStatus)),
    defaultValue: PaymentStatus.Pending
  })
  @ApiProperty({ example: 'pending', description: 'Status regarding payment' })
  paymentStatus: PaymentStatus;

  @Column({
    type: DataType.ENUM(...Object.values(OrderStatus)),
    defaultValue: OrderStatus.Pending
  })
  @ApiProperty({ example: 'pending', description: 'Status regarding order' })
  orderStatus: OrderStatus;

  @Column
  @ApiProperty({ example: 123456, description: 'Number attached to order if order is shipped' })
  trackingNumber: number;

  @Column
  @ApiProperty({ example: '2023-08-30T13:31:12.000Z', description: 'date order is shipped' })
  shippedDate: Date

  @Column
  @ApiProperty({ example: '2023-09-09', description: 'date order is estimated to arrive to customer' })
  estimatedArrivalDate: Date

  @Column({ type: 'text' })
  @ApiProperty({ example: 'extra notes', description: 'notes for the order' })
  notes: string;

  @Column({ type: 'DECIMAL(10, 2)' })
  @ApiProperty({ example: 10.0, description: 'Amount to be dedicated from the total cost for customer' })
  discountAmount: number;

  @Column({ type: 'DECIMAL(10, 2)' })
  @ApiProperty({ example: 1.5, description: 'Amount paid as tax for order' })
  taxAmount: number;

  @Column({ type: 'DECIMAL(10, 2)' })
  @ApiProperty({ example: 123456, description: 'Number attached to order if order is shipped' })
  shippingFee: number;


  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  @ApiProperty({ example: false, description: 'state if the customer deleted the order' })
  isDeleted: boolean;
}
