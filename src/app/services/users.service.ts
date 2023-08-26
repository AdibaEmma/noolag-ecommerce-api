import {usersConstants} from '@app/constants/constants';
import {Role} from '@app/entities';
import {User} from '@app/entities/users.entity';
import {Inject, NotFoundException} from '@nestjs/common';

export class UsersService {
  constructor(
    @Inject(usersConstants.users_repository)
    private usersRepository: typeof User,
    @Inject(usersConstants.roles_repository)
    private rolesRepository: typeof Role,
  ) {}

  async findUserByUsername(username: string): Promise<User | null> {
    return await this.usersRepository.findOne({where: {username}});
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({where: {email}});
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.usersRepository.findByPk(id);

    if (!user) {
      throw new NotFoundException(`User with id '${id}' not found.`);
    }

    return user;
  }

  async updateUserRoles(id: number, roleIds: number[]): Promise<void> {
    const user = await this.findUserById(id);
    const roles = await this.rolesRepository.findAll({where: {id: roleIds}});

    if (roleIds.length > roles.length) {
      throw new NotFoundException('One or more roles not found.');
    }

    await user.$set('roles', roles);
  }
}
