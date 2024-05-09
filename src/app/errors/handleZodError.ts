import { ZodError, ZodIssue } from 'zod';
import { TGenericErrorResponse } from '../interface/error';

export const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const statusCode = 400;
  const errorMessage = err.issues
    .map((issue: ZodIssue) => issue.message)
    .join(', ');

  return {
    statusCode,
    message: 'Validation Error',
    errorMessage,
  };
};
