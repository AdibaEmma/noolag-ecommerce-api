import {Module} from '@nestjs/common';
import {PaymentsController} from '../controllers/payments.controller';
import {OrdersService, PaymentsService} from '@app/services';
import {RequestService} from '@app/services/requests.service';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, RequestService, OrdersService],
})
export class PaymentsModule {}
