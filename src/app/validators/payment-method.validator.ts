/* eslint-disable @typescript-eslint/no-unused-vars */
import {PaymentMethod} from '@app/enums';
import {registerDecorator, ValidationOptions, ValidationArguments} from 'class-validator';

export function IsPaymentMethod(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isPaymentMethod',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return Object.values(PaymentMethod).includes(value);
        },
        defaultMessage(validationArguments?: ValidationArguments): string {
          return `${validationArguments?.property} must be a valid PaymentMethod`;
        },
      },
    });
  };
}
