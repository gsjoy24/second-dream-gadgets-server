/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type UserRoles = {
  ADMIN: 'admin';
  MANAGER: 'manager';
  USER: 'user';
};

export type TCart = {
  product: Types.ObjectId;
  quantity: number;
};

export type TUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: UserRoles;
  cart: TCart[];
};

export interface TUserModel extends Model<TUser> {
  isUserExists(email: string): Promise<TUser | null>;
  isPasswordMatched(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isProductExistInCart: (productId: Types.ObjectId, userId: string) => void;
}
