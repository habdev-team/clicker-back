import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';

import { MongooseError } from 'mongoose';

import type { Response, Request } from 'express';

@Catch(MongooseError)
export class MongoExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger();

  constructor() {}

  catch(exception: MongooseError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    this.logger.error(
      `${req.method} ${req.url} ${HttpStatus.SERVICE_UNAVAILABLE} error: ${exception.message}`,
    );

    res
      .status(HttpStatus.SERVICE_UNAVAILABLE)
      .json({ error: true, message: 'Server is unavailable' });
  }
}
