import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsInt, IsNotEmpty, IsString} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  name: string;

  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: 'This is an optional property',
  })
  description: string;

  @IsInt()
  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  price: number;

  @IsInt()
  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  categoryId: number;
}
