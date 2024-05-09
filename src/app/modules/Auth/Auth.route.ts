import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import AuthControllers from './Auth.controller';
import AuthValidations from './Auth.validation';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidations.LoginUserValidationSchema),
  AuthControllers.loginUser,
);

export const AuthRoutes = router;
