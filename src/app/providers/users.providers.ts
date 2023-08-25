import {usersConstants} from '@app/constants';
import {User} from '@app/entities/users.entity';

export const usersProviders = [
  {
    provide: usersConstants.users_repository,
    useValue: User,
  },
];
