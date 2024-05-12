/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import Product from '../Product/product.model';
import User from '../User/user.model';
import { TSale } from './sale.interface';
import Sale from './sale.model';

const addSaleIntoDB = async (payload: TSale, user: JwtPayload) => {
  const userWithCart = await User.findById(user._id)
    .select('cart')
    .populate('cart.product', '_id product_name product_price quantity');

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

  const products = userWithCart.cart.map(({ product, quantity }: any) => ({
    product_name: product.product_name,
    price: product?.product_price,
    quantity,
  }));

  const total_amount = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
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

const getAllSalesFromDB = async (query: Record<string, unknown>) => {
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;
  const queryObject = { ...query };
  const salePeriod = query?.salePeriod || 'all';

  let startDate = new Date();
  switch ((salePeriod as string).toLowerCase()) {
    case 'daily':
      startDate.setUTCHours(0, 0, 0, 0);
      break;

    case 'weekly':
      startDate.setUTCHours(0, 0, 0, 0);
      startDate.setDate(startDate.getUTCDate() - startDate.getUTCDay());
      break;

    case 'monthly':
      startDate = new Date(
        Date.UTC(
          startDate.getUTCFullYear(),
          startDate.getUTCMonth(),
          1,
          0,
          0,
          0,
          0,
        ),
      );
      break;

    case 'yearly':
      startDate = new Date(
        Date.UTC(startDate.getUTCFullYear(), 0, 1, 0, 0, 0, 0),
      );
      break;
    default:
      startDate = new Date(0);
  }

  // format date to ISO string
  const formattedStartDate = startDate.toISOString().slice(0, -1) + '+00:00';

  //! filter by date
  const createdAtFilter =
    salePeriod !== 'all'
      ? {
          selling_date: {
            $gte: formattedStartDate,
            $lt: new Date().toISOString(),
          },
        }
      : {};

  // remove salePeriod from queryObject
  delete queryObject.salePeriod;
  delete queryObject.search;

  //search by name
  const searchWithName = query?.search
    ? {
        $or: [
          {
            'products.product_name': {
              $regex: query?.search as string,
              $options: 'i',
            },
          },
          { customer_name: { $regex: query?.search, $options: 'i' } },
        ],
      }
    : {};

  const salesWithSearch = Sale.find(searchWithName);
  const sales = await salesWithSearch
    .find({
      ...queryObject,
      ...createdAtFilter,
    })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .populate('sold_by', 'name email');

  const total = await Sale.countDocuments({
    ...queryObject,
    ...createdAtFilter,
  });

  const meta = {
    total,
    page,
    limit,
  };

  return {
    meta,
    sales,
  };
};

const deleteSaleFromDB = async (id: string) => {
  const sale = await Sale.isSaleExists(id);
  if (!sale) {
    throw new AppError(httpStatus.NOT_FOUND, 'Sale record not found');
  }
  const result = Sale.findByIdAndDelete(id);
  return result;
};

const deleteMultipleSalesFromDB = async (ids: string[]) => {
  const sales = await Sale.find({ _id: { $in: ids } });
  if (!sales.length) {
    throw new AppError(httpStatus.NOT_FOUND, 'Sales not found');
  }

  const result = Sale.deleteMany({ _id: { $in: ids } }) as any;
  return result;
};

const SaleServices = {
  addSaleIntoDB,
  getAllSalesFromDB,
  getSaleFromDB,
  deleteSaleFromDB,
  deleteMultipleSalesFromDB,
};

export default SaleServices;
