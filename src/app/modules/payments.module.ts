import {Logger, Module} from '@nestjs/common';
import {PaymentsController} from '../controllers/payments.controller';
import {RequestService} from '@app/services/requests.service';
import {DatabaseModule} from './database.module';
import {HttpModule} from '@nestjs/axios';
import {PaymentsService, ValidationService} from '@app/services';
import {JwtService} from '@nestjs/jwt';
import {RedisService} from '@app/services/redis.service';

@Module({
  imports: [DatabaseModule, HttpModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, RequestService, JwtService, ValidationService, RedisService, Logger, ...transactionsProviders, ...ordersProviders],
})
export class PaymentsModule {}
