import { CurrentUser } from '@app/decorators';
import {CreatePaymentDto} from '@app/dtos';
import {Transaction} from '@app/entities';
import {AuthGuard} from '@app/guards';
import {PaymentsService, ValidationService} from '@app/services';
import {Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, Query, UseGuards, forwardRef} from '@nestjs/common';
import {ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnprocessableEntityResponse} from '@nestjs/swagger';

@ApiTags('payments')
@Controller()
export class PaymentsController {
  constructor(
    @Inject(forwardRef(() => PaymentsService)) private readonly paymentsService: PaymentsService,
    @Inject(forwardRef(() => ValidationService)) private readonly validationService: ValidationService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('initiate-payment')
  @UseGuards(AuthGuard)
  @ApiOperation({summary: 'Initiate Payment'})
  @ApiOkResponse({description: 'Transaction initiated successfully'})
  @ApiForbiddenResponse({description: 'Unauthorized Request'})
  @ApiUnprocessableEntityResponse({description: 'Bad Request'})
  initiatePayment(@Body() createPaymentDto: CreatePaymentDto, @CurrentUser() user: any) {
    return this.paymentsService.initiateTransaction(createPaymentDto, user.sub);
  }

  @Get('verify-transaction')
  @ApiOperation({summary: 'Verify Transaction'})
  @ApiOkResponse({description: 'Transaction verified successfully', type: Transaction})
  verifyTransaction(@Query('reference') reference: string) {
    return this.paymentsService.verifyTransaction(reference);
  }
}
