import { Model, Column, Table } from 'sequelize-typescript';

@Table
export class Product extends Model<Product> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ nullable = false})
  name: string;

  @Column
  description: string;

  @Column({ type: 'DECIMAL(10, 2)' })
  price: number;

  // You can add more columns and associations here
}
