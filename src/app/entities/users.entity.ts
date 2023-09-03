import {AutoIncrement, BelongsToMany, Column, HasMany, Model, PrimaryKey, Table} from 'sequelize-typescript';
import {Order, Role, UserRole} from '@app/entities';
import {ApiProperty} from '@nestjs/swagger';

@Table({
  underscored: true,
})
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

  @Column({
    defaultValue: false,
  })
  @ApiProperty({example: false, description: 'state of email verification'})
  isEmailVerified: boolean;

  @Column
  @ApiProperty({example: 123456, description: 'code sent via email to verify account'})
  emailVerificationCode: number;

  @Column
  @ApiProperty({example: 123456, description: 'code needed to reset password'})
  passwordResetCode: number;

  @Column
  @ApiProperty({example: '*****', description: 'password of the user'})
  password: string;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];

  @HasMany(() => Order)
  userOrders: Order[];
}
