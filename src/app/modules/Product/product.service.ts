import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import excludeFields from './product.constant';
import { TProduct } from './product.interface';
import Product from './product.model';

const addProductIntoDB = async (payload: TProduct, user: JwtPayload) => {
  const result = await Product.create({ ...payload, user: user._id });
  return result;
};

const getAllProductsFromDB = async (
  query: Record<string, unknown>,
  user: JwtPayload,
) => {
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;
  const queryObject = { ...query };
  const releasePeriod = query?.releasePeriod || 'all';

  // I took help of ChatGpt to implement filtering with the date. I was facing some issues with the date filtering. ChatGpt helped me to solve the issue.
  const filterByUser = user.role === 'user' ? { user: user._id } : {};

  let startDate = new Date();
  switch ((releasePeriod as string).toLowerCase()) {
    case 'daily':
      startDate.setUTCHours(0, 0, 0, 0);
      break;

    case 'weekly':
      startDate.setDate(startDate.getDate() - startDate.getUTCDay());
      startDate.setUTCHours(0, 0, 0, 0);
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

  //filter by date
  const createdAtFilter =
    releasePeriod !== 'all'
      ? {
          createdAt: {
            $gte: formattedStartDate,
            $lt: new Date().toISOString(),
          },
        }
      : {};

  //search by name
  const searchWithName = query?.search
    ? {
        product_name: { $regex: query?.search, $options: 'i' },
      }
    : {};

  //filter by price
  const minMaxPrice =
    query?.minPrice && query?.maxPrice
      ? {
          product_price: {
            $gte: query.minPrice,
            $lte: query.maxPrice,
          },
        }
      : {};

  //sort by (default: product_name)
  const sortBy = query?.sortBy || 'product_name';

  //sort order (default: desc)
  const sortOrder = query?.sortOrder && query?.sortOrder === 'asc' ? 1 : -1;
  const sort: string | { [key: string]: 'asc' | 'desc' } = query.sortBy
    ? {
        [sortBy as string]: sortOrder === 1 ? 'asc' : 'desc',
      }
    : {};

  //delete unwanted fields from query object
  excludeFields.forEach((field) => delete queryObject[field]);

  //filter by other fields
  const filteredProducts = Product.find({
    isDeleted: query?.isDeleted || false,
    ...queryObject,
  })
    .find(filterByUser)
    .find(searchWithName)
    .find(createdAtFilter)
    .find(minMaxPrice);

  const total = await Product.countDocuments(filteredProducts);
  const allProducts = await filteredProducts.sort(sort).skip(skip).limit(limit);

  const meta = {
    page,
    limit,
    total,
  };

  return { meta, allProducts };
};

const getProductByIdFromDB = async (id: string) => {
  const product = await Product.isProductExists(id);

  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }
  return product;
};

const deleteProductByIdFromDB = async (id: string) => {
  const product = await Product.isProductExists(id);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }

  const res = await Product.findByIdAndUpdate(id, { isDeleted: true });
  return res;
};

const deleteMultipleProductsFromDB = async (product_ids: string[]) => {
  const products = await Product.updateMany(
    { _id: { $in: product_ids } },
    { isDeleted: true },
  );
  return products;
};

const updateProductByIdFromDB = async (id: string, payload: TProduct) => {
  const product = await Product.isProductExists(id);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }

  const updatedProduct = await Product.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return updatedProduct;
};

const ProductServices = {
  addProductIntoDB,
  getAllProductsFromDB,
  getProductByIdFromDB,
  deleteProductByIdFromDB,
  deleteMultipleProductsFromDB,
  updateProductByIdFromDB,
};

export default ProductServices;
