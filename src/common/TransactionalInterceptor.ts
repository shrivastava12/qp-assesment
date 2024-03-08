import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { firstValueFrom, from } from 'rxjs';
import { IncomingMessage } from 'http';
import { Sequelize } from 'sequelize-typescript';

/**
 * The interceptor to wrap the request into a database transaction.
 */
@Injectable()
export class TransactionalInterceptor implements NestInterceptor {
  /**
   * The request methods that updates to database.
   */
  private readonly UPDATE_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE'];

  /**
   * Create the interceptor with specified sequelize instance.
   * @param sequelize the sequelize instance
   */
  constructor(private sequelize: Sequelize) {}

  /**
   * Intercept and wrap the request into a database transaction.
   * @param context the context
   * @param next the next handler
   */
  intercept(context: ExecutionContext, next: CallHandler) {
    const { method } = context
      .getArgs()
      .find((x) => x instanceof IncomingMessage);

    if (this.UPDATE_METHODS.includes(method)) {
      return from(
        this.sequelize.transaction(async () => {
          return await firstValueFrom(next.handle());
        }),
      );
    }

    return next.handle();
  }
}
