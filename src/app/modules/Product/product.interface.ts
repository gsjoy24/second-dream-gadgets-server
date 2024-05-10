/* eslint-disable no-unused-vars */
import { JwtPayload } from 'jsonwebtoken';
import { Model, Types } from 'mongoose';

export type TProduct = {
  _id?: string;
  user: Types.ObjectId;
  product_name: string;
  product_image: string;
  product_price: number;
  category: string;
  brand: string;
  model_number: string;
  quantity: number;
  operating_system: string;
  connectivity: string;
  power_source: string;
  camera_resolution: string;
  storage_capacity: string;
  screen_resolution: string;
  ram_capacity: string;
  warranty: number;
  weight: number;
  createdAt?: Date;
};

export interface TProductModel extends Model<TProduct> {
  isProductExists(id: string, user: JwtPayload): Promise<TProduct | null>;
}
