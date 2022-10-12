import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status = exception?.getStatus() || 500;
    const errors = buildErrors(exception);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      errors,
    });
  }
}

const buildErrors = (exception: HttpException) => {
  const exceptionMessage = exception.getResponse()?.['message'];

  return Array.isArray(exceptionMessage)
    ? exceptionMessage.map((x) => {
        if (typeof x === 'object') {
          const { message, type, path, value } = x;
          return { message, type, path, value };
        }

        return x;
      })
    : [exceptionMessage];
};
