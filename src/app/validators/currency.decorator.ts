/* eslint-disable @typescript-eslint/no-unused-vars */
import {registerDecorator, ValidationOptions, ValidationArguments} from 'class-validator';

const currencyCodePattern = /^[A-Z]{3}$/; // Regular expression for 3 uppercase letters

export function IsCurrencySymbol(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isCurrency',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && currencyCodePattern.test(value);
        },
        defaultMessage(validationArguments?: ValidationArguments): string {
          return `${validationArguments?.property} must be a valid currency code (e.g., "GHS")`;
        },
      },
    });
  };
}
