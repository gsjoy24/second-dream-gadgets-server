import express from 'express';
import authGuard from '../../middlewares/authGuard';
import CartControllers from './cart.controller';

const router = express.Router();

router.post(
  '/add',
  authGuard('user', 'admin', 'manager'),
  CartControllers.addProductToCart,
);

const CartRoutes = router;
export default CartRoutes;
