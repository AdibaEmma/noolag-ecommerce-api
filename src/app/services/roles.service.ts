import {usersConstants} from '@app/constants';
import {Role} from '@app/entities';
import {Inject, Injectable} from '@nestjs/common';

@Injectable()
export class RolesService {
  constructor(
    @Inject(usersConstants.roles_repository)
    private rolesRepository: typeof Role,
  ) {}

  async seedRoles(): Promise<void> {
    const roles = ['user', 'admin'];

    for (const roleName of roles) {
      await this.rolesRepository.findOrCreate({where: {name: roleName}});
    }
  }
}
