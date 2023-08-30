import {ApiProperty} from '@nestjs/swagger';
import {IsInt, IsString} from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Name update property',
    example: 'Dell wireless keyboard',
  })
  name: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Description update property',
    example: 'Dell Wireless Keyboard with standard keys',
  })
  description: string;

  @IsInt()
  @ApiProperty({
    type: Number,
    description: 'Price update property',
    example: 345.25,
  })
  price: number;

  @IsInt()
  @ApiProperty({
    type: Number,
    description: 'Category update property',
    example: 2,
  })
  categoryId: number;
}
