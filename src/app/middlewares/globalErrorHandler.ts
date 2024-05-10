import { ErrorRequestHandler, NextFunction } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import AppError from '../errors/AppError';
import { duplicateError } from '../errors/duplicateErorr';
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
  } else if (err.code === 11000) {
    simplifyError = duplicateError(err);
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
    // if the error is 401 or the NODE_ENV is not development, we don't want to show the error stack.
    stack:
      config.NODE_ENV === 'development' && err.statusCode !== 401
        ? err.stack
        : null,
  });
};

export default globalErrorHandler;
