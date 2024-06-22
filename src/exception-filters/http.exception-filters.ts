import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

import type { Response, Request } from 'express';

@Catch(HttpException || ForbiddenException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger();

  constructor() {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    this.logger.error(
      `${req.method} ${req.url} ${HttpStatus.FORBIDDEN} error: ${exception.message}`,
    );

    res
      .status(HttpStatus.FORBIDDEN)
      .json({ error: true, message: 'Incorrect credentials!' });
  }
}
