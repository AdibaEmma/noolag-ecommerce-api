import {AutoIncrement, BelongsToMany, Column, Model, PrimaryKey, Table} from 'sequelize-typescript';
import {User, UserRole} from '@app/entities';

@Table
export class Role extends Model<Role> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @BelongsToMany(() => Role, () => UserRole)
  users: User[];
}
