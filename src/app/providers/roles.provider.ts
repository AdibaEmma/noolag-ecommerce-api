import {usersConstants} from '@app/constants';
import {Role} from '@app/entities';

export const rolesProviders = [
  {
    provide: usersConstants.roles_repository,
    useValue: Role,
  },
];
