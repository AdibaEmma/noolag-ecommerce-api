import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsInt, IsString} from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Name update property',
  })
  name: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Description update property',
  })
  description: string;

  @IsInt()
  @ApiProperty({
    type: Number,
    description: 'Price update property',
  })
  price: number;

  @IsInt()
  @ApiProperty({
    type: Number,
    description: 'Category update property',
  })
  categoryId: number;
}
