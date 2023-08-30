import {Logger, Module} from '@nestjs/common';
import {EmailService, UsersService, ValidationService} from '@app/services';
import {EmailController} from '@app/controllers/email.controller';
import {DatabaseModule} from './database.module';
import {rolesProviders, usersProviders} from '@app/providers';

@Module({
  imports: [DatabaseModule],
  providers: [EmailService, UsersService, ValidationService, Logger, ...usersProviders, ...rolesProviders],
  controllers: [EmailController],
  exports: [EmailService],
})
export class EmailModule {}
