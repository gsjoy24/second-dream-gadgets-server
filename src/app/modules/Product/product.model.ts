import { Schema, model } from 'mongoose';
import { TProduct, TProductModel } from './product.interface';

const ProductSchema = new Schema<TProduct, TProductModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    product_name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },

    product_price: {
      type: Number,
      required: [true, 'Price is required'],
      trim: true,
    },
    product_image: {
      type: String,
      required: [true, 'Image is required'],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
      trim: true,
    },
    model_number: {
      type: String,
      required: [true, 'Model Number is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    operating_system: {
      type: String,
      required: [true, 'Operating System is required'],
      trim: true,
    },
    connectivity: {
      type: String,
      required: [true, 'Connectivity is required'],
      trim: true,
    },
    power_source: {
      type: String,
      required: [true, 'Power Source is required'],
      trim: true,
    },
    warranty: {
      type: Number,
      required: [true, 'Warranty is required'],
      trim: true,
    },
    weight: {
      type: Number,
      required: [true, 'Weight is required'],
      trim: true,
    },
    camera_resolution: {
      type: String,
      trim: true,
    },
    screen_resolution: {
      type: String,
      trim: true,
    },
    storage_capacity: {
      type: String,
      trim: true,
    },
    ram_capacity: {
      type: String,
    },

    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

ProductSchema.statics.isProductExists = async function (id: string) {
  return await this.findById(id);
};

const Product = model<TProduct, TProductModel>('Product', ProductSchema);

export default Product;
