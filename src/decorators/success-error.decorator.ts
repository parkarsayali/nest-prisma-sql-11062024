// import { HttpStatus } from '@nestjs/common';

import { HttpStatus } from '@nestjs/common';

// export function SuccessError(): MethodDecorator {
//   return function (
//     target: any,
//     key: string | symbol,
//     descriptor: PropertyDescriptor,
//   ) {
//     const originalMethod = descriptor.value;

//     descriptor.value = async function (...args: any[]) {
//       try {
//         // Call the original controller method
//         const result = await originalMethod.apply(this, args);
//         // console.log('sucess-error result', result);
//         // Handle success response
//         if (result !== null && result.statusCode === 200) {
//           return {
//             statusCode: HttpStatus.OK,
//             success: true,
//             message: result.message || 'Operation successful',
//             data: result.data || result.states || result,
//           };
//         } else if (result !== null && result.statusCode === 201) {
//           return {
//             statusCode: HttpStatus.CREATED,
//             success: true,
//             message: result.message || 'Operation successful',
//             data: result.data || result.states || result,
//           };
//         } else if (result !== null && result.statusCode === 404) {
//           return {
//             statusCode: HttpStatus.NOT_FOUND,
//             success: true,
//             message: result.message || 'Record not found',
//             data: result.data || result.states || result,
//           };
//         } else {
//           return {
//             statusCode: HttpStatus.BAD_REQUEST,
//             success: false,
//             error: result.errorMessage || 'Invalid parameter(s) provided',
//           };
//         }
//       } catch (error) {
//         // Handle error response
//         return {
//           statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
//           success: false,
//           error: error.message || 'Internal Server Error',
//         };
//       }
//     };

//     return descriptor;
//   };
// }

// success-error-decorator.ts

export function SuccessError(): MethodDecorator {
  return function (
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        // Call the original controller method
        const result = await originalMethod.apply(this, args);
        // console.log('success-error result', result);
        // Handle success response
        if (result !== null && result.statusCode === 200) {
          return {
            statusCode: HttpStatus.OK,
            success: true,
            message: result.message || 'Operation successful',
            data: result.data || result.states || result,
          };
        } else if (result !== null && result.statusCode === 201) {
          return {
            statusCode: HttpStatus.CREATED,
            success: true,
            message: result.message || 'Operation successful',
            data: result.data || result.states || result,
          };
        } else if (result !== null && result.statusCode === 404) {
          return {
            statusCode: HttpStatus.NOT_FOUND,
            success: false,
            message: result.message || 'Record not found',
            data: {},
          };
        } else {
          return {
            statusCode: HttpStatus.BAD_REQUEST,
            success: false,
            error: result.errorMessage || 'Invalid parameter(s) provided',
          };
        }
      } catch (error) {
        // Handle error response
        return {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          success: false,
          error: error.message || 'Internal Server Error',
        };
      }
    };

    return descriptor;
  };
}
