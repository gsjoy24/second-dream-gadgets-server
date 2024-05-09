import { ErrorRequestHandler, NextFunction } from 'express';
import { ZodError } from 'zod';
import AppError from '../errors/AppError';
import { handleCastError } from '../errors/handleCastError';
import handleValidationError from '../errors/handleValidationError';
import { handleZodError } from '../errors/handleZodError';
import { unauthorizedError } from '../errors/unauthorizedError';

const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  next: NextFunction,
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong!';
  let errorMessage = err.message || 'Something went wrong!';
  let simplifyError;

  if (err instanceof ZodError) {
    simplifyError = handleZodError(err);
  } else if (err.name === 'ValidationError') {
    simplifyError = handleValidationError(err);
  } else if (err.name === 'CastError') {
    simplifyError = handleCastError(err);
  } else if (err.statusCode === 401) {
    simplifyError = unauthorizedError(err);
  }

  statusCode = simplifyError?.statusCode;
  message = simplifyError?.message;
  errorMessage = simplifyError?.errorMessage;

  if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
  }

  return res.status(statusCode || 500).json({
    success: false,
    message,
    errorMessage,
    errorDetails: err.statusCode === 401 ? null : err,
    stack: err.statusCode === 401 ? null : err?.stack,
  });
};

export default globalErrorHandler;
