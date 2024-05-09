import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

import UserControllers from './user.controller';
import UserValidations from './user.validation';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(UserValidations.UserValidationSchema),
  UserControllers.createUser,
);

export const UserRoutes = router;
