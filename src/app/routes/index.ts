import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.routes';
import CartRoutes from '../modules/Cart/cart.routes';
import { ProductRoutes } from '../modules/Product/product.routes';
import SaleRoutes from '../modules/Sales/sale.routes';
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
