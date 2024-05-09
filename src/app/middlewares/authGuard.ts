import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';

import User from '../modules/User/user.model';
import catchAsync from '../utils/catchAsync';

const authGuard = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // check if the user send the token
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized Access');
    }

    // check if the token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { _id, role } = decoded;

    // check if the user is exist
    const user = await User.findById(_id);
    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized Access');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized Access');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default authGuard;
