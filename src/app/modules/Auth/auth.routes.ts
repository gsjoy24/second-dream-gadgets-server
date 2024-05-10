import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import AuthControllers from './auth.controller';
import AuthValidations from './auth.validation';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidations.LoginUserValidationSchema),
  AuthControllers.loginUser,
);

export const AuthRoutes = router;
