// src/common/utils/validation.factory.ts
import {
  BadRequestException,
  UnprocessableEntityException,
  ValidationError,
} from '@nestjs/common';

export const validationExceptionFactory = (errors: ValidationError[]) => {
  const formattedErrors = {};

  errors.forEach((err: any) => {
    // 'property' adalah nama field yang error (e.g., "name", "location")
    // 'constraints' adalah objek berisi pesan-pesan error untuk field tersebut
    formattedErrors[err.property] = Object.values(err.constraints);
  });

  // Kembalikan error dengan payload yang sudah kita format
  return new UnprocessableEntityException({
    status: 'UNPROCESSABLE_ENTITY',
    message: 'The given data was invalid.', // Pesan generik
    errors: formattedErrors, // Objek error kita yang terstruktur
  });
};
