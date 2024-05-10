import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import Product from '../Product/product.model';
import { TCart } from '../User/user.interface';
import User from '../User/user.model';

const addProductToCart = async (product: TCart, user: JwtPayload) => {
  // check if the product is exists
  const isProductExist = await Product.findById(product.product);
  if (!isProductExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }

  // check if the product is already in the cart
  const isExistInTheCart = await User.findOne({
    _id: user._id,
    cart: {
      $elemMatch: {
        product: product.product,
      },
    },
  });
  if (isExistInTheCart) {
    throw new AppError(httpStatus.CONFLICT, 'Product already in the cart');
  }

  await User.findByIdAndUpdate(user._id, {
    $addToSet: {
      cart: product,
    },
  });

  return;
};

const removeFromCart = async (product: string, user: JwtPayload) => {
  // find if the product is in the cart array
  const isExistInTheCart = await User.findOne({
    _id: user._id,
    cart: {
      $elemMatch: {
        product,
      },
    },
  });
  if (!isExistInTheCart) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found in the cart');
  }
  await User.findOneAndUpdate(
    { _id: user._id },
    {
      $pull: {
        cart: {
          product,
        },
      },
    },
  );

  return;
};

const CartServices = {
  addProductToCart,
  removeFromCart,
};

export default CartServices;
