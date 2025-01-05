import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const dto = this.reflector.get<any>('dto', context.getHandler());
    return next
      .handle()
      .pipe(
        map((data) =>
          dto
            ? plainToClass(dto, data, { excludeExtraneousValues: true })
            : data,
        ),
      );
  }
}
