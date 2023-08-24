import {ApiProperty} from '@nestjs/swagger';
import {IsString} from 'class-validator';

export class UpdateCategoryDto {
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
}
