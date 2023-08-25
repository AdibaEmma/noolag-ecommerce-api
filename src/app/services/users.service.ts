import {usersConstants} from '@app/constants/constants';
import {User} from '@app/entities/users.entity';
import {Inject} from '@nestjs/common';

export class UsersService {
  constructor(
    @Inject(usersConstants.users_repository)
    private usersRepository: typeof User,
  ) {}

  async findUserByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({where: {username}});
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({where: {email}});
  }
}
