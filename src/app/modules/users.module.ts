import {Module} from '@nestjs/common';
import {DatabaseModule} from './database.module';
import {UsersService} from '@app/services/users.service';
import {usersProviders} from '@app/providers/users.providers';
import {JwtService} from '@nestjs/jwt';
import {UsersController} from '@app/controllers/users.controller';
import {rolesProviders} from '@app/providers/roles.provider';

@Module({
  imports: [DatabaseModule],
  providers: [UsersService, JwtService, ...usersProviders, ...rolesProviders],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
