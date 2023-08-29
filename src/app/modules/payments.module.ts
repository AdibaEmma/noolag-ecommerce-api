import {Module} from '@nestjs/common';
import {PaymentsController} from '../controllers/payments.controller';
import {OrdersService, PaymentsService} from '@app/services';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, OrdersService],
})
export class PaymentsModule {}
