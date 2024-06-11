// apply-transform-interceptor-to-method.decorator.ts
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';

export const ApplyTransformInterceptorToMethod = <T>(
  dtoClass: new (...args: any[]) => T,
  options?: any,
): MethodDecorator => {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const result = await originalMethod.apply(this, args);
      const interceptor = new TransformInterceptor(dtoClass, options);
      return interceptor.transform(result);
    };

    return descriptor;
  };
};
