import { ObjectLiteral } from '../types/object-literal.type';

export const SuccessResponse = (
  message: string,
  data?: ObjectLiteral,
  meta?: ObjectLiteral
) => {
  return {
    success: true,
    message,
    data,
    meta,
  };
};

export const ErrorResponse = (message: string, errors?: any[]) => {
  return {
    success: false,
    message,
    errors,
  };
};
