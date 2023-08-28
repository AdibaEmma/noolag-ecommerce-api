import {ApiProperty} from '@nestjs/swagger';
import {AutoIncrement, Column, Model, PrimaryKey, Table} from 'sequelize-typescript';

@Table
export class OrderItem extends Model<OrderItem> {
  @PrimaryKey
  @AutoIncrement
  @Column
  @ApiProperty({example: 1, description: 'id of the orderItem'})
  id: number;
}
