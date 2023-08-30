import {Logger, Module} from '@nestjs/common';
import {PaymentsController} from '../controllers/payments.controller';
import {RequestService} from '@app/services/requests.service';
import {DatabaseModule} from './database.module';
import {HttpModule} from '@nestjs/axios';
import {PaymentsService, ValidationService} from '@app/services';
import {JwtService} from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule, HttpModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, RequestService, JwtService, ValidationService, Logger],
})
export class PaymentsModule {}
