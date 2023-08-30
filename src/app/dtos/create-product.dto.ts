import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsInt, IsNotEmpty, IsString} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Product name',
    example: 'Hp Elitebook G6',
  })
  name: string;

  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: 'The description of the product',
    example: 'Hp Elitebook G6 256GB SSD 16GB RAM',
  })
  description: string;

  @IsInt()
  @ApiProperty({
    type: Number,
    description: 'Product price',
    example: 1250.0,
  })
  price: number;

  @IsInt()
  @ApiProperty({
    type: Number,
    description: 'Category Id',
    example: 1,
  })
  categoryId: number;
}
