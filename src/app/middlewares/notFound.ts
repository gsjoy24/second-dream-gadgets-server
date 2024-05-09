import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
const notFound = (
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  next: NextFunction,
) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    status: httpStatus.NOT_FOUND,
    message: 'Not Found!',
  });
};

export default notFound;
