import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();
    const exceptionResponse = exception.getResponse() as any;

    response.status(statusCode).json({
      code: statusCode,
      status:
        exceptionResponse.status ||
        exceptionResponse.error?.toUpperCase().replace(/ /g, '_'),
      message: exceptionResponse.message,
      errors: exceptionResponse.errors || {
        detail: [exceptionResponse.message],
      },
    });
  }
}
