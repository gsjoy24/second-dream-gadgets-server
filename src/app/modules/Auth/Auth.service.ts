/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TLoginUser } from './Auth.interface';
import { User } from './Auth.model';

const loginUser = async (payload: TLoginUser) => {
  // check if the user exists
  const isUserExits = await User.isUserExists(payload.email);

  if (!isUserExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const user = await User.findOne({ email: payload.email });

  // check for password match
  const isPasswordMatched = await User.isPasswordMatched(
    payload.password,
    isUserExits.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Invalid credentials! Try again!',
    );
  }

  const jwtPayload = {
    _id: isUserExits._id,
    name: isUserExits.name,
    role: isUserExits.role,
    email: isUserExits.email,
  };

  const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expiration,
  });

  return { user, token };
};

export const AuthServices = {
  loginUser,
};
