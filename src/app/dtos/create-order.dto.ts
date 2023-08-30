import {IsNumber, IsNotEmpty, IsArray, ValidateNested, IsString} from 'class-validator';
import {Type} from 'class-transformer';
import {CreateOrderItemDto} from './create-order-item.dto';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => CreateOrderItemDto)
  @ApiProperty({
    type: [CreateOrderItemDto],
    description: 'Array of order items',
    example: [
      {
        productId: 1,
        quantity: 2,
      },
    ],
  })
  orderItems: CreateOrderItemDto[];

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: 'Total cost in decimal',
    example: 2500.25,
  })
  totalCost: number;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Shipping address for order',
    example: 'Tema, Accra, Ghana',
  })
  shippingAddress: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Billing address for order',
    example: 'Tema, Accra, Ghana',
  })
  billingAddress: string;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'Discount on order',
    example: 0.5,
  })
  discountAmount: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'Tax on order',
    example: 2.5,
  })
  taxAmount: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'Fee to be charged for shipping',
    example: 20.00,
  })
  shippingFee: number;

  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: 'Additional notes for order',
  })
  notes: string;
}
