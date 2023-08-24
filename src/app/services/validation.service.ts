import {BadRequestException, Injectable} from '@nestjs/common';
import {validate as validateClass} from 'class-validator';
import {plainToInstance} from 'class-transformer';

@Injectable()
export class ValidationService {
  async validateDto<T>(dtoClass: any, data: T): Promise<any> {
    let errors: any = await validateClass(plainToInstance(dtoClass, data));
    errors = errors.map((error) => Object.values(error.constraints)).flat();
    if (errors.length) {
      throw new BadRequestException(errors);
    }
  }
}
