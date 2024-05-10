import express from 'express';
import authGuard from '../../middlewares/authGuard';
import validateRequest from '../../middlewares/validateRequest';
import CartControllers from './cart.controller';
import CartValidations from './cart.validation';

const router = express.Router();

router.post(
  '/add',
  authGuard('user', 'admin', 'manager'),
  validateRequest(CartValidations.addToCart),
  CartControllers.addProductToCart,
);

router.delete(
  '/remove/:productId',
  authGuard('user', 'admin', 'manager'),
  CartControllers.removeFromCart,
);

router.put(
  '/:action/:productId',
  authGuard('user', 'admin', 'manager'),
  CartControllers.manipulateProductQuantity,
);

const CartRoutes = router;
export default CartRoutes;
