import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Global,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

@Global()
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor {
  private readonly defaultOptions = {
    excludeExtraneousValues: true,
  };

  constructor(
    private readonly dtoClass: new (...args: any[]) => T,
    private readonly options?: any,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const options = { ...this.defaultOptions, ...this.options };
    return next.handle().pipe(map((data) => this.transform(data)));
  }

  transform(data: any): T | T[] {
    const options = { ...this.defaultOptions, ...this.options };
    console.log('dtoClass', this.dtoClass);
    console.log('data', data);
    console.log('options', options);

    return plainToInstance(this.dtoClass, data, options);
  }
}
