import {UUID} from 'crypto';
import {BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table} from 'sequelize-typescript';
import {Order} from './orders.entity';
import {ApiProperty} from '@nestjs/swagger';

@Table({
  underscored: true,
})
export class Transaction extends Model<Transaction> {
  @PrimaryKey
  @Column
  @ApiProperty({example: 'random uuid', description: 'id of the transaction'})
  id: UUID;

  @ForeignKey(() => Order)
  @BelongsTo(() => Order, {as: 'orderAssociation'})
  @ApiProperty({example: 1, description: 'id of the order'})
  orderId: number;

  @Column
  @ApiProperty({example: 'success', description: 'status of transaction to external payment api'})
  status: string;

  @Column
  @ApiProperty({example: '2023-08-30T13:30:33.000Z', description: 'date the transaction was initiated'})
  transactionDate: Date;

  @Column
  @ApiProperty({example: '2023-08-30T13:31:12.000Z', description: 'date the transaction was paid for'})
  paidAt: Date;

  @Column
  @ApiProperty({example: 'AUTH_random_generated_alpha_numerals', description: 'code used to authorize transaction'})
  authorizationCode: string;

  @Column
  @ApiProperty({example: 'random_generated_alpha_numerals', description: 'code used to verify the initiated transaction'})
  reference: string;

  @Column
  @ApiProperty({example: '11090', description: 'numeric string linked to payment receipt'})
  receipt_number: string;

  @Column({type: 'DECIMAL(10, 2)', allowNull: false})
  @ApiProperty({example: '5000', description: 'amount paid for transaction'})
  amount: number;

  @Column({type: 'DECIMAL(10, 2)'})
  @ApiProperty({example: 97.5, description: 'fees charged on transaction'})
  fees: number;

  @Column
  @ApiProperty({example: 'card', description: 'payment method'})
  channel: string;

  @Column
  @ApiProperty({example: 'GHS', description: 'currency transaction is charged in'})
  currency: string;

  @Column
  @ApiProperty({example: null, description: 'card_type if channel is card'})
  card_type: string;

  @Column
  @ApiProperty({example: 'mtn', description: 'bank from which the transaction is charged from'})
  bank: string;

  @Column
  @ApiProperty({example: '0551234567', description: 'mobile money number if the channel is mobile_money'})
  mobile_money_number: string;

  @Column
  @ApiProperty({example: 12345667, description: 'customer generated from payment provider'})
  customerId: number;

  @Column
  @ApiProperty({example: 'Approved', description: 'message about transaction'})
  message: string;
}
