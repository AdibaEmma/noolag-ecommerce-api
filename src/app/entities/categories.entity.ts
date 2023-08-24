/* eslint-disable prettier/prettier */
import { Model, Column, Table, PrimaryKey, AutoIncrement, HasMany } from 'sequelize-typescript';
import { Product } from './products.entity';
import { ApiProperty } from '@nestjs/swagger';

@Table
export class Category extends Model<Category> {
  @PrimaryKey
  @AutoIncrement
  @Column
  @ApiProperty({ example: 1, description: 'id of the category' })
  id: number;

  @Column({ allowNull: false })
  @ApiProperty({ example: 'Electronics', description: 'name of the category' })
  name: string;

  @Column
  @ApiProperty({ example: 'Electronics for home and office', description: 'description of the category' })
  description: string;

  @HasMany(() => Product)
  @ApiProperty({example: '[ProductEntity]', description: 'list of products associated with category'})
  products: Product[];
}
