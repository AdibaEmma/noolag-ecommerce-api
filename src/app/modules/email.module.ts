import {Logger, Module} from '@nestjs/common';
import {EmailService, UsersService, ValidationService} from '@app/services';
import {EmailController} from '@app/controllers/email.controller';
import {DatabaseModule} from './database.module';

@Module({
  imports: [DatabaseModule],
  providers: [EmailService, UsersService, ValidationService, Logger],
  controllers: [EmailController],
  exports: [EmailService],
})
export class EmailModule {}
