/* eslint-disable @typescript-eslint/no-unused-vars */
import {registerDecorator, ValidationOptions, ValidationArguments} from 'class-validator';

const phoneNumberPattern = /^\d{10}$/;

export function IsMobileMoneyPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isMobileMoneyPhoneNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && phoneNumberPattern.test(value);
        },
        defaultMessage(validationArguments?: ValidationArguments): string {
          return `${validationArguments?.property} must be a valid mobile money phone number (10 digits)`;
        },
      },
    });
  };
}
