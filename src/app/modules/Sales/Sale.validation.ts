import { z } from 'zod';

const SaleValidationSchema = z.object({
  body: z.object({
    customer: z
      .string({
        required_error: 'Customer Name is required',
        invalid_type_error: 'Customer Name must be a string',
      })
      .min(3, {
        message: 'Customer Name must be at least 3 characters long',
      }),
    product: z.string({
      required_error: 'Product ID is required',
      invalid_type_error: 'Product ID must be a string',
    }),
    quantity: z
      .number({
        required_error: 'Quantity is required',
        invalid_type_error: 'Quantity must be a number',
      })
      .gt(0, {
        message: 'Quantity must be greater than 0',
      }),
    total_price: z
      .number({
        required_error: 'Total price is required',
        invalid_type_error: 'Total price must be a number',
      })
      .gt(0, {
        message: 'Total price must be greater than 0',
      }),
    date: z.string({
      required_error: 'Date is required',
      invalid_type_error: 'Date must be a string',
    }),
  }),
});

const SaleUpdateValidationSchema = z.object({
  body: z.object({
    customer: z
      .string({
        invalid_type_error: 'Customer Name must be a string',
      })
      .min(3, {
        message: 'Customer Name must be at least 3 characters long',
      })
      .optional(),
    product: z
      .string({
        invalid_type_error: 'Product ID must be a string',
      })
      .optional(),
    quantity: z
      .number({
        invalid_type_error: 'Quantity must be a number',
      })
      .gt(0, {
        message: 'Quantity must be greater than 0',
      })
      .optional(),
    price: z
      .number({
        invalid_type_error: 'Price must be a number',
      })
      .gt(0, {
        message: 'Price must be greater than 0',
      })
      .optional(),
  }),
});

const SaleValidations = {
  SaleValidationSchema,
  SaleUpdateValidationSchema,
};

export default SaleValidations;
