/* eslint-disable prettier/prettier */
import { Model, Column, Table, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Category } from './categories.entity';

@Table
export class Product extends Model<Product> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @ForeignKey(() => Category)
    categoryId: number;

    @Column({ allowNull: false })
    name: string;

    @Column
    description: string;

    @Column({ type: 'DECIMAL(10, 2)', allowNull: false })
    price: number;


    @BelongsTo(() => Category)
    category: Category;
}
