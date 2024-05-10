import httpStatus from 'http-status';
import { TGenericErrorResponse } from '../interface/error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars, @typescript-eslint/no-unused-vars
export const duplicateError = (err: any): TGenericErrorResponse => {
  const statusCode = httpStatus.CONFLICT;
  const errorMessage =
    'User already exists. Please login or use a different email address.';

  return {
    statusCode,
    message: 'Unauthorized Access',
    errorMessage,
  };
};
