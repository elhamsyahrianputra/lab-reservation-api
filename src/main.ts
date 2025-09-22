import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { validationExceptionFactory } from './utils/validation.factory';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  // Solve BigInt failed serialization
  (BigInt.prototype as any).toJSON = function () {
    return Number(this);
  };

  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: validationExceptionFactory,
      whitelist: true, // Opsi tambahan: otomatis menghapus properti yang tidak ada di DTO
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
