import {AutoIncrement, BelongsToMany, Column, Model, PrimaryKey, Table} from 'sequelize-typescript';
import {Role, UserRole} from '@app/entities';
import {ApiProperty} from '@nestjs/swagger';

@Table
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  @ApiProperty({example: 1, description: 'id of the user'})
  id: number;

  @Column({allowNull: false})
  @ApiProperty({example: 'John', description: 'firstname of the user'})
  firstName: string;

  @Column({allowNull: false})
  @ApiProperty({example: 'Doe', description: 'lastname of the user'})
  lastName: string;

  @Column
  @ApiProperty({example: 'johny', description: 'username of the user'})
  username: string;

  @Column({allowNull: false})
  @ApiProperty({example: 'johndoe@example.com', description: 'email of the user'})
  email: string;

  @Column
  @ApiProperty({example: '*****', description: 'password of the user'})
  password: string;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];
}
