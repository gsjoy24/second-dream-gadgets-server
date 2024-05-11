/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TSoldProduct = {
  product: string;
  price: number;
  quantity: number;
};

export type TSale = {
  customer_name: string;
  contact_number: string;
  sold_by: Types.ObjectId;
  products: TSoldProduct[];
  total_amount: number;
  selling_date?: Date;
  createdAt?: Date;
};

export interface TSaleModel extends Model<TSale> {
  isSaleExists(id: string): Promise<TSale | null>;
}
