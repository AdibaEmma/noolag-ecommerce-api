import {ApiProperty} from '@nestjs/swagger';
import {IsDate} from 'class-validator';

export class ShipOrderDto {
  @IsDate()
  @ApiProperty({
    type: Date,
    description: 'Estimated time of arrival for order',
    example: '2023-09-09',
  })
  eta: Date;
}
