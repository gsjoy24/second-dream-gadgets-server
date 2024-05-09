import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interface/error';

export const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const statusCode = 404;
  const errorMessage = `${err.value} is not a valid ID!`;

  return {
    statusCode,
    message: 'invalid id',
    errorMessage,
  };
};
