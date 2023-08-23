/* eslint-disable prettier/prettier */
import {Model, Column, Table, PrimaryKey, AutoIncrement, HasMany} from 'sequelize-typescript';
import {Product} from './products.entity';

@Table
export class Category extends Model<Category> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({allowNull: false})
  name: string;

  @Column
  description: string;

  @HasMany(() => Product)
  products: Product[];
}
