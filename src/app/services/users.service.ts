import {USERS_CONSTANTS} from '@app/constants/users.constants';
import {User} from '@app/entities/users.entity';
import {Inject} from '@nestjs/common';

const {users_repository} = USERS_CONSTANTS;
export class UsersService {
  constructor(
    @Inject(users_repository)
    private usersRepository: typeof User,
  ) {}

  async findUserByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({where: {username}});
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({where: {email}});
  }
}
