import express from 'express';
import authGuard from '../../middlewares/authGuard';
import validateRequest from '../../middlewares/validateRequest';
import UserControllers from './user.controller';
import UserValidations from './user.validation';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(UserValidations.UserValidationSchema),
  UserControllers.createUser,
);

router.post(
  '/create-admin-or-manager',
  authGuard('admin'),
  validateRequest(UserValidations.adminAndManagerValidationSchema),
  UserControllers.createAdminAndManager,
);

export const UserRoutes = router;
