import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Interface ini bisa dihapus atau disesuaikan jika tidak diperlukan lagi
export interface Response<T> {
  code: number;
  status: string;
  message: string;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const httpContext = context.switchToHttp();
    const response = httpContext.getResponse();
    const statusCode = response.statusCode;

    // Pesan default tetap ada sebagai fallback
    let defaultMessage = 'Request successful';

    return next.handle().pipe(
      map((data) => ({
        code: statusCode,
        status: HttpStatus[statusCode],
        // Cek jika 'data' memiliki property 'message', jika tidak, gunakan defaultMessage
        message: data?.message || defaultMessage,
        // Cek jika 'data' memiliki property 'result', jika tidak, gunakan 'data' itu sendiri.
        // Jika ada message, pastikan 'data' tidak ikut tercetak.
        data:
          data?.result !== undefined
            ? data.result
            : data?.message
              ? undefined
              : data,
      })),
    );
  }
}
