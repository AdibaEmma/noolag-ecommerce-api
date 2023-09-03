import {BelongsTo, ForeignKey, Model, Table} from 'sequelize-typescript';
import {User, Role} from '@app/entities';

@Table({
  underscored: true,
})
export class UserRole extends Model<UserRole> {
  @ForeignKey(() => User)
  @BelongsTo(() => User, {as: 'userAssociation'})
  userFk: User;

  @ForeignKey(() => Role)
  @BelongsTo(() => Role, {as: 'roleAssociation'})
  roleFk: Role;
}
