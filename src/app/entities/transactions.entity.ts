import {UUID} from 'crypto';
import {BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table} from 'sequelize-typescript';
import {Order} from './orders.entity';

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
  reference: string;

  @Column({type: 'DECIMAL(10, 2)', allowNull: false})
  amount: number;

  @Column
  message: string;
}
