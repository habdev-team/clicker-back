import {
  HttpStatus,
  Injectable,
  CallHandler,
  HttpException,
  NestInterceptor,
  ExecutionContext,
} from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';

import { MongooseError } from 'mongoose';

@Injectable()
export class ErrorCatcherInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<HttpException> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof MongooseError) {
          return throwError(
            () =>
              new HttpException(
                'Server is unavailable',
                HttpStatus.SERVICE_UNAVAILABLE,
              ),
          );
        }

        return throwError(
          () => new HttpException('Incorrect request', HttpStatus.BAD_REQUEST),
        );
      }),
    );
  }
}
