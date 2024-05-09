import { z } from 'zod';

const UserValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required!',
        invalid_type_error: 'Name must be a string!',
      })
      .trim(),
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
      .refine(
        (value) => {
          const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
          return regex.test(value);
        },
        {
          message:
            'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number.',
        },
      ),
  }),
});

const adminAndManagerValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required!',
        invalid_type_error: 'Name must be a string!',
      })
      .trim(),
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
      .refine(
        (value) => {
          const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
          return regex.test(value);
        },
        {
          message:
            'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number.',
        },
      ),
    role: z.enum(['admin', 'manager'], {
      required_error: 'Role is required!',
      invalid_type_error: 'Role must be either admin or manager!',
    }),
  }),
});

const UserValidations = {
  UserValidationSchema,
  adminAndManagerValidationSchema,
};

export default UserValidations;
