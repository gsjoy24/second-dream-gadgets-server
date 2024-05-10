import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';
import AppError from '../../errors/AppError';
import Product from '../Product/product.model';
import { TCart } from '../User/user.interface';
import User from '../User/user.model';

const addProductToCart = async (cartData: TCart, user: JwtPayload) => {
  // check if the product is exists
  const isProductExist = await Product.findById(cartData.product);
  if (!isProductExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }

  await User.findByIdAndUpdate(user._id, {
    $addToSet: {
      cart: cartData,
    },
  });

  return;
};

const removeFromCart = async (product: Types.ObjectId, user: JwtPayload) => {
  // find if the product is in the cart array
  await User.isProductExistInCart(product, user._id);

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

const manipulateProductQuantity = async (
  product: Types.ObjectId,
  action: string,
  user: JwtPayload,
) => {
  // find if the product is in the cart
  await User.isProductExistInCart(product, user._id);

  // if action is increment then increment the quantity, if decrement then decrement the quantity
  if (action === 'increment') {
    await User.findOneAndUpdate(
      {
        _id: user._id,
        'cart.product': product,
      },
      {
        $inc: {
          'cart.$.quantity': 1,
        },
      },
    );
  } else if (action === 'decrement') {
    await User.findOneAndUpdate(
      {
        _id: user._id,
        'cart.product': product,
      },
      {
        $inc: {
          'cart.$.quantity': -1,
        },
      },
    );
  }

  return;
};

const CartServices = {
  addProductToCart,
  removeFromCart,
  manipulateProductQuantity,
};

export default CartServices;
