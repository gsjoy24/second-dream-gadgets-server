import express from 'express';
import authGuard from '../../middlewares/authGuard';
import CartControllers from './cart.controller';

const router = express.Router();

router.get('/my-cart', authGuard('user', 'manager'), CartControllers.getCart);

router.post(
  '/add/:productId',
  authGuard('user', 'manager'),
  CartControllers.addProductToCart,
);

router.delete(
  '/remove/:productId',
  authGuard('user', 'manager'),
  CartControllers.removeFromCart,
);

router.put(
  '/:action/:productId',
  authGuard('user', 'manager'),
  CartControllers.manipulateProductQuantity,
);

const CartRoutes = router;
export default CartRoutes;
