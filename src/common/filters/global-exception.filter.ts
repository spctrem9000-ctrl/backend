import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let details: string[] = [];
    let code = 'INTERNAL_ERROR';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse() as any;
      message = exceptionResponse.message || exception.message;

      // Handle class-validator errors mapped by ValidationPipe
      if (Array.isArray(exceptionResponse.message)) {
        details = exceptionResponse.message;
        message = 'Input validation failed';
        code = 'VALIDATION_FAILED';
      } else {
        code = exceptionResponse.error || HttpStatus[status];
      }
    } else {
      // Unhandled Exceptions
      this.logger.error(
        `[Unhandled Exception] ${request.method} ${request.originalUrl}`,
        (exception as Error).stack,
      );
      message = (exception as Error).message || message;
    }

    response.status(status).json({
      success: false,
      error: {
        code,
        message,
        details: details.length > 0 ? details : undefined,
        path: request.url,
        timestamp: new Date().toISOString(),
      },
    });
  }
}
