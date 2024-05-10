import { z } from 'zod';

const addToCart = z.object({
  body: z.object({
    product: z.string({
      required_error: 'Product id is required',
    }),
    quantity: z
      .number({
        required_error: 'Quantity is required',
        invalid_type_error: 'Quantity must be a number',
      })
      .int({
        message: 'Quantity must be an integer',
      }),
  }),
});

const CartValidations = {
  addToCart,
};

export default CartValidations;
