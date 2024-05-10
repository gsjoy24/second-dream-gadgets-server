import { JwtPayload } from 'jsonwebtoken';
import { TCart } from '../User/user.interface';
import User from '../User/user.model';

const addProductToCart = async (product: TCart, user: JwtPayload) => {
  // push product to cart of the user.

  const result = await User.findOneAndUpdate(
    { _id: user.id },
    { $push: { cart: product } },
    { new: true },
  );

  return result;
};

const CartServices = {
  addProductToCart,
};

export default CartServices;
