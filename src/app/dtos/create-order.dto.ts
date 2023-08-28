import {IsNumber, IsNotEmpty, IsArray, ValidateNested, IsString} from 'class-validator';
import {Type} from 'class-transformer';
import {CreateOrderItemDto} from './create-order-item.dto';

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => CreateOrderItemDto)
  orderItems: CreateOrderItemDto[];

  @IsNumber()
  @IsNotEmpty()
  totalCost: number;

  @IsNotEmpty()
  shippingAddress: string;

  @IsNotEmpty()
  billingAddress: string;

  @IsNumber()
  discountAmount: number;

  @IsNumber()
  taxAmount: number;

  @IsNumber()
  shippingFee: number;

  @IsString()
  notes: string;
}
