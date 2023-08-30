import {ApiProperty} from '@nestjs/swagger';
import {IsNumber, IsNotEmpty} from 'class-validator';

export class CreateOrderItemDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  productId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  quantity: number;
}
