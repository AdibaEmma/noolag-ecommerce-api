/* eslint-disable prettier/prettier */
import {Model, Column, Table, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {Category} from './categories.entity';
import { ApiProperty } from '@nestjs/swagger';

@Table
export class Product extends Model<Product> {
  @PrimaryKey
  @AutoIncrement
  @Column
  @ApiProperty({ example: 1, description: 'id of the product' })
  id: number;

  @ForeignKey(() => Category)
  @ApiProperty({ example: 1, description: 'id of the category the product belong to' })
  categoryId: number;

  @Column({allowNull: false})
  @ApiProperty({ example: 'Dell Laptop', description: 'name of the product' })
  name: string;

  @Column
  @ApiProperty({ example: 'Dell XPS core i7', description: 'description of the product' })
  description: string;

  @Column({type: 'DECIMAL(10, 2)', allowNull: false})
  @ApiProperty({ example: 1000.00, description: 'price of the product' })
  price: number;

  @BelongsTo(() => Category)
  category: Category;
}
