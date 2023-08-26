import {Role} from '@app/enums/role.enum';
import {AutoIncrement, Column, DataType, Model, PrimaryKey, Table} from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({allowNull: false})
  firstName: string;

  @Column({allowNull: false})
  lastName: string;

  @Column
  username: string;

  @Column({allowNull: false})
  email: string;

  @Column
  password: string;

  @Column(DataType.ARRAY(DataType.ENUM))
  roles: Role[];
}
