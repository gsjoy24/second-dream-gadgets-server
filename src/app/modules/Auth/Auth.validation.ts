import { z } from 'zod';

const LoginUserValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required!',
        invalid_type_error: 'Email must be a string!',
      })
      .email({
        message: 'Please enter a valid email',
      })
      .trim(),
    password: z
      .string({
        required_error: 'Password is required!',
        invalid_type_error: 'Password must be a string!',
      })
      .trim(),
  }),
});

const AuthValidations = {
  LoginUserValidationSchema,
};

export default AuthValidations;
