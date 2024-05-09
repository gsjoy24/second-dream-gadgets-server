/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TSale = {
  customer: string;
  product: Types.ObjectId;
  quantity: number;
  total_price: number;
  date?: Date;
  createdAt?: Date;
};

export interface TSaleModel extends Model<TSale> {
  isSaleExists(id: string): Promise<TSale | null>;
}
