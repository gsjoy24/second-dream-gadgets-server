import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import Product from '../Product/product.model';
import { TSale } from './sale.interface';
import Sale from './sale.model';

const addSaleIntoDB = async (payload: TSale) => {
  const product = await Product.isProductExists(payload.product.toString());
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }
  // check if quantity is available
  if (product.quantity < payload.quantity) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Quantity exceeds the available quantity',
    );
  }
  // decrement quantity
  const decrementQuantity = await Product.findByIdAndUpdate(
    payload.product,
    {
      $inc: { quantity: -payload.quantity },
    },
    { new: true },
  );
  if (!decrementQuantity) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Quantity not updated');
  }

  // delete product if quantity is 0
  if (decrementQuantity.quantity === 0) {
    await Product.findByIdAndDelete(payload.product);
  }

  const newSale = Sale.create(payload);
  return newSale;
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
          date: {
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
        customer: { $regex: query?.search, $options: 'i' },
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
    .populate('product');

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
  getAllSalesFromDB,
  getSaleFromDB,
  updateSaleIntoDB,
  deleteSaleFromDB,
  deleteMultipleSalesFromDB,
};

export default SaleServices;
