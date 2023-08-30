import {UUID} from 'crypto';
import {BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table} from 'sequelize-typescript';
import {Order} from './orders.entity';
import {User} from './users.entity';

@Table
export class Transaction extends Model<Transaction> {
  @PrimaryKey
  @Column
  id: UUID;

  @ForeignKey(() => Order)
  @BelongsTo(() => Order, {as: 'orderAssociation'})
  orderId: number;

  @Column
  status: string;

  @Column
  transactionDate: Date;

  @Column
  paidAt: Date;

  @Column
  authorizationCode: string;

  @Column
  reference: string;

  @Column
  receipt_number: number;

  @Column({type: 'DECIMAL(10, 2)', allowNull: false})
  amount: number;

  @Column({type: 'DECIMAL(10, 2)'})
  fees: number;

  @Column
  channel: string;

  @Column
  currency: string;

  @Column
  card_type: string;

  @Column
  bank: string;

  @Column
  mobile_money_number: string;

  @Column
  customerId: number;

  @Column
  message: string;
}
