import {AutoIncrement, BelongsToMany, Column, Model, PrimaryKey, Table} from 'sequelize-typescript';
import {User, UserRole} from '@app/entities';
import {ApiProperty} from '@nestjs/swagger';

@Table
export class Role extends Model<Role> {
  @PrimaryKey
  @AutoIncrement
  @Column
  @ApiProperty({example: 1, description: 'id of role'})
  id: number;

  @Column
  @ApiProperty({example: 'user', description: 'role a user has'})
  name: string;

  @BelongsToMany(() => Role, () => UserRole)
  users: User[];
}
