import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
const notFound = (
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  next: NextFunction,
) => {
  return res.status(httpStatus.BAD_REQUEST).json({
    success: false,
    statusCode: httpStatus.BAD_REQUEST,
    message: 'Api not found. Please check the url and try again.',
  });
};

export default notFound;
