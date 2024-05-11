import { Schema, model } from 'mongoose';
import { TSale, TSaleModel } from './sale.interface';

const soldProductSchema = new Schema(
  {
    product_name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Current price is required'],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const SaleSchema = new Schema<TSale, TSaleModel>(
  {
    customer_name: {
      type: String,
      required: [true, 'Customer Name is required'],
      trim: true,
    },
    contact_number: {
      type: String,
      required: [true, 'Contact number is required'],
      trim: true,
    },
    sold_by: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    products: [soldProductSchema],
    total_amount: {
      type: Number,
      required: [true, 'Total amount is required'],
      trim: true,
    },
    selling_date: {
      type: Date,
      required: [true, 'Selling date is required'],
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const Sale = model<TSale, TSaleModel>('Sale', SaleSchema);

export default Sale;
