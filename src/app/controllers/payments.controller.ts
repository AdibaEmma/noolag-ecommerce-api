import {CreatePaymentDto} from '@app/dtos';
import {AuthGuard} from '@app/guards';
import {PaymentsService, ValidationService} from '@app/services';
import {Body, Controller, Inject, Post, UseGuards, forwardRef} from '@nestjs/common';

@Controller()
@UseGuards(AuthGuard)
export class PaymentsController {
  constructor(
    @Inject(forwardRef(() => PaymentsService)) private readonly paymentsService: PaymentsService,
    @Inject(forwardRef(() => ValidationService)) private readonly validationService: ValidationService,
  ) {}

  @Post('initiate-payment')
  initiatePayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.initiateTransaction(createPaymentDto);
  }
}
