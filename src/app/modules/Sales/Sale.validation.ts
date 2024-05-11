import { z } from 'zod';

const SaleValidationSchema = z.object({
  body: z.object({
    customer_name: z
      .string({
        required_error: 'Customer Name is required',
        invalid_type_error: 'Customer Name must be a string',
      })
      .min(3, {
        message: 'Customer Name must be at least 3 characters long',
      }),
    selling_date: z.string({
      required_error: 'Selling date is required',
      invalid_type_error: 'Selling date must be a string',
    }),
    contact_number: z
      .string({
        required_error: 'Contact number is required',
      })
      .min(11, {
        message: 'Contact number must be at least 11 characters long',
      }),
  }),
});

const SaleValidations = {
  SaleValidationSchema,
};

export default SaleValidations;
