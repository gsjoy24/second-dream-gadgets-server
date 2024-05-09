import { TGenericErrorResponse } from '../interface/error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars, @typescript-eslint/no-unused-vars
export const unauthorizedError = (err: any): TGenericErrorResponse => {
  const statusCode = 401;
  const errorMessage = `You do not have the necessary permissions to access this resource.`;

  return {
    statusCode,
    message: 'Unauthorized Access',
    errorMessage,
  };
};
