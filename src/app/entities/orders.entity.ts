/* eslint-disable prettier/prettier */
import {Model, Column, Table, PrimaryKey, AutoIncrement} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table
export class Order extends Model<Order> {
  @PrimaryKey
  @AutoIncrement
  @Column
  @ApiProperty({ example: 1, description: 'id of the order' })
  id: number;

  
}
