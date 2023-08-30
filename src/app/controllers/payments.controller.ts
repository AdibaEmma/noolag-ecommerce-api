import {CreatePaymentDto} from '@app/dtos';
import {AuthGuard} from '@app/guards';
import {PaymentsService, ValidationService} from '@app/services';
import {Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, Query, UseGuards, forwardRef} from '@nestjs/common';

@Controller()
export class PaymentsController {
  constructor(
    @Inject(forwardRef(() => PaymentsService)) private readonly paymentsService: PaymentsService,
    @Inject(forwardRef(() => ValidationService)) private readonly validationService: ValidationService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('initiate-payment')
  @UseGuards(AuthGuard)
  initiatePayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.initiateTransaction(createPaymentDto);
  }

  @Get('verify-transaction')
  verifyTransaction(@Query('reference') reference: string) {
    return this.paymentsService.verifyTransaction(reference);
  }
}
