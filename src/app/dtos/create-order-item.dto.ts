import {ApiProperty} from '@nestjs/swagger';
import {IsNumber, IsNotEmpty} from 'class-validator';

export class CreateOrderItemDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: 'ProductId of the selected product',
    example: 1,
  })
  productId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: 'The quantity of selected product',
    example: 5,
  })
  quantity: number;
}
