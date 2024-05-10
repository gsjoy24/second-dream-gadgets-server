import { Schema, model } from 'mongoose';
import { TSale, TSaleModel } from './sale.interface';

const SaleSchema = new Schema<TSale, TSaleModel>(
  {
    customer: {
      type: String,
      required: [true, 'Customer Name is required'],
      trim: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      required: [true, 'Product ID is required'],
      ref: 'Product',
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      trim: true,
    },
    total_price: {
      type: Number,
      required: [true, 'Price is required'],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

SaleSchema.statics.isSaleExists = async function (id: string) {
  return this.findById(id).populate('product');
};

const Sale = model<TSale, TSaleModel>('Sale', SaleSchema);

export default Sale;
