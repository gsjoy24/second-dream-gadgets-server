import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './Auth.controller';
import UserValidations from './Auth.validation';
const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidations.UserValidationSchema),
  UserControllers.createUser,
);

router.post(
  '/login',
  validateRequest(UserValidations.LoginUserValidationSchema),
  UserControllers.loginUser,
);

export const UserRoutes = router;
