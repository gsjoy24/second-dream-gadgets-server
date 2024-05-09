import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interface/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const errorKeys = Object.keys(err.errors);
  const errorMessage = errorKeys
    .map((key) => err.errors[key].message)
    .join(', ');

  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessage,
  };
};
export default handleValidationError;
