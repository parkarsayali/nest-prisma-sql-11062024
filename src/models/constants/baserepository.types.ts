// Define IfFieldExists type
export type IfFieldExists<T, K extends keyof any, Y, N = {}> = K extends keyof T
  ? Y
  : N;
