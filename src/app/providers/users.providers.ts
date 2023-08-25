import {USERS_CONSTANTS} from '@app/constants/users.constants';
import {User} from '@app/entities/users.entity';

const {users_repository} = USERS_CONSTANTS;

export const usersProviders = [
  {
    provide: users_repository,
    useValue: User,
  },
];
