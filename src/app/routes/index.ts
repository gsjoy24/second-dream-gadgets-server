import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/Auth.route';
import CartRoutes from '../modules/Cart/cart.routes';
import { ProductRoutes } from '../modules/Product/product.route';
import SaleRoutes from '../modules/Sales/Sale.route';
import { UserRoutes } from '../modules/User/user.routes';

const router = Router();
const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/sales',
    route: SaleRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/cart',
    route: CartRoutes,
  },
];

moduleRoutes.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;
