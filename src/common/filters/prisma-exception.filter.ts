import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
    catch(
        exception: Prisma.PrismaClientKnownRequestError,
        host: ArgumentsHost,
    ) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const message = exception.message.replace(/\n/g, '');

        switch (exception.code) {
            // Kode P2002: Unique constraint failed
            case 'P2002': {
                const status = HttpStatus.CONFLICT;
                response.status(status).json({
                    statusCode: status,
                    message: `Unique constraint failed on the field: ${(exception.meta?.target as string[]).join(', ')}`,
                });
                break;
            }
            // Kode P2025: Record to delete/update does not exist
            case 'P2025': {
                const status = HttpStatus.NOT_FOUND;
                response.status(status).json({
                    statusCode: status,
                    message:
                        'Record not found. ' + (exception.meta?.cause || ''),
                });
                break;
            }
            default: {
                // Untuk error Prisma lainnya yang tidak ditangani secara spesifik
                const status = HttpStatus.INTERNAL_SERVER_ERROR;
                response.status(status).json({
                    statusCode: status,
                    message: `Unhandled Prisma Error (${exception.code}): ${message}`,
                });
                break;
            }
        }
    }
}
