import {Module} from '@nestjs/common';
import {DatabaseModule} from './database.module';
import {UsersService} from '@app/services/users.service';
import {usersProviders} from '@app/providers/users.providers';

@Module({
  imports: [DatabaseModule],
  providers: [UsersService, ...usersProviders],
  controllers: [],
  exports: [UsersService],
})
export class UsersModule {}