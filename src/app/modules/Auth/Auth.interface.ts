/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type UserRoles = {
  ADMIN: 'admin';
  MANAGER: 'manager';
  USER: 'user';
};

export type TUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: UserRoles;
};

export type TLoginUser = {
  email: string;
  password: string;
};

export interface TUserModel extends Model<TUser> {
  isUserExists(email: string): Promise<TUser | null>;
  isPasswordMatched(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
