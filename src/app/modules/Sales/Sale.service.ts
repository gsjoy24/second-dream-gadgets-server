/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
// import Product from '../Product/product.model';
import Product from '../Product/product.model';
import User from '../User/user.model';
import { TSale } from './sale.interface';
import Sale from './sale.model';

const addSaleIntoDB = async (payload: TSale, user: JwtPayload) => {
  const userWithCart = await User.findById(user._id)
    .select('cart')
    .populate('cart.product', '_id product_price quantity');

  if (!userWithCart?.cart.length) {
    throw new AppError(httpStatus.NOT_FOUND, 'No product found in cart');
  }

  // check if the quantity of the product is not more than the available quantity
  const isProductAvailable = userWithCart.cart.every(
    (product: any) => product.quantity <= product.product.quantity,
  );

  if (!isProductAvailable) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Product quantity is more than available quantity',
    );
  }

  const products = userWithCart.cart.map((product: any) => ({
    product: product.product._id,
    current_price: product.product?.product_price,
    quantity: product.quantity,
  }));

  const total_amount = products.reduce(
    (acc, product) => acc + product.current_price * product.quantity,
    0,
  );

  const session = await Sale.startSession();
  try {
    session.startTransaction();

    //  decrementing the selling quantity of the product on product collection
    const productIds = userWithCart.cart.map((product: any) => ({
      soldProductId: product.product._id,
      decrementQuantity: product.quantity,
    }));

    await Product.bulkWrite(
      productIds.map((product: any) => ({
        updateOne: {
          filter: { _id: product.soldProductId },
          update: {
            $inc: {
              quantity: -product.decrementQuantity,
            },
          },
        },
      })),
      { session },
    );

    const sale = await Sale.create(
      [
        {
          ...payload,
          products,
          total_amount,
          sold_by: user._id,
        },
      ],
      { session },
    );

    // empty the cart of the user after the sale
    await User.findByIdAndUpdate(user._id, { $set: { cart: [] } }, { session });

    // delete the products from the product collection if the quantity is 0
    await Product.deleteMany({ quantity: 0 }, { session });

    await session.commitTransaction();
    await session.endSession();
    return sale;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Sale failed');
  }
};

const getSaleFromDB = async (id: string) => {
  const sale = await Sale.isSaleExists(id);
  if (!sale) {
    throw new AppError(httpStatus.NOT_FOUND, 'Sale not found');
  }
  return sale;
};

const updateSaleIntoDB = async (
  id: string,
  payload: Record<string, unknown>,
) => {
  const sale = await Sale.isSaleExists(id);
  if (!sale) {
    throw new AppError(httpStatus.NOT_FOUND, 'Sale not found');
  }
  const result = Sale.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteSaleFromDB = async (id: string) => {
  const sale = await Sale.isSaleExists(id);
  if (!sale) {
    throw new AppError(httpStatus.NOT_FOUND, 'Sale not found');
  }
  const result = Sale.findByIdAndDelete(id);
  return result;
};

const deleteMultipleSalesFromDB = async (ids: string[]) => {
  const result = Sale.deleteMany({ _id: { $in: ids } });
  return result;
};

const SaleServices = {
  addSaleIntoDB,
  getSaleFromDB,
  updateSaleIntoDB,
  deleteSaleFromDB,
  deleteMultipleSalesFromDB,
};

export default SaleServices;
