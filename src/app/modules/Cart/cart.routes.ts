import express from 'express';
import authGuard from '../../middlewares/authGuard';
import validateRequest from '../../middlewares/validateRequest';
import CartControllers from './cart.controller';
import CartValidations from './cart.validation';

const router = express.Router();

router.get('/my-cart', authGuard('user', 'manager'), CartControllers.getCart);

router.post(
  '/add',
  authGuard('user', 'manager'),
  validateRequest(CartValidations.addToCart),
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
