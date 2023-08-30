import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsNotEmpty, IsString} from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'The name of the category',
    example: 'Electronics',
  })
  name: string;

  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: 'Description of the category',
    example: 'Electronics for the home and office',
  })
  description: string;
}
