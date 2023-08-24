import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {IsNotEmpty, IsString} from 'class-validator';

export class CreateCategoryDto {
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
}
