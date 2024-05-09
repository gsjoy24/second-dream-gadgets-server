import { z } from 'zod';

const productValidationSchema = z.object({
  body: z.object({
    product_name: z
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string',
      })
      .min(3, {
        message: 'Name must be at least 3 characters long',
      })
      .max(50, {
        message: 'Name must be less than 50 characters long',
      }),

    product_price: z
      .number({
        required_error: 'Price is required',
        invalid_type_error: 'Price must be a number',
      })
      .gt(0, {
        message: 'Price must be greater than 0',
      }),

    product_image: z
      .string({
        required_error: 'Image is required',
        invalid_type_error: 'Image must be a string',
      })
      .url({
        message: 'Image must be a valid URL',
      }),

    quantity: z
      .number({
        required_error: 'Quantity is required',
        invalid_type_error: 'Quantity must be a number',
      })
      .gt(0, {
        message: 'Quantity must be greater than 0',
      }),

    brand: z.string({
      required_error: 'Brand is required',
      invalid_type_error: 'Brand must be a string',
    }),

    model_number: z.string({
      required_error: 'Model Number is required',
      invalid_type_error: 'Model Number must be a string',
    }),

    category: z.string({
      required_error: 'Category is required',
      invalid_type_error: 'Category must be a string',
    }),

    operating_system: z.string({
      required_error: 'Operating System is required',
      invalid_type_error: 'Operating System must be a string',
    }),
    connectivity: z.string({
      required_error: 'Connectivity is required',
      invalid_type_error: 'Connectivity must be a string',
    }),

    power_source: z.string({
      required_error: 'Power Source is required',
      invalid_type_error: 'Power Source must be a string',
    }),

    camera_resolution: z.string({
      required_error: 'Camera Resolution is required',
      invalid_type_error: 'Camera Resolution must be a string',
    }),

    storage_capacity: z.string({
      required_error: 'Storage Capacity is required',
      invalid_type_error: 'Storage Capacity must be a string',
    }),

    screen_resolution: z.string({
      required_error: 'Screen Resolution is required',
      invalid_type_error: 'Screen Resolution must be a string',
    }),

    warranty: z.number({
      required_error: 'Warranty is required',
      invalid_type_error: 'Warranty must be a number',
    }),

    weight: z.number({
      required_error: 'Weight is required',
      invalid_type_error: 'Weight must be a number',
    }),
  }),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    product_name: z
      .string()
      .min(3, { message: 'Name must be at least 3 characters long' })
      .max(50, { message: 'Name must be less than 50 characters long' })
      .optional(),

    product_price: z
      .number({
        invalid_type_error: 'Price must be a number',
      })
      .gt(0, { message: 'Price must be greater than 0' })
      .optional(),

    product_image: z
      .string({
        invalid_type_error: 'Image must be a string',
      })
      .optional(),

    quantity: z
      .number({
        invalid_type_error: 'Quantity must be a number',
      })
      .gt(0, { message: 'Quantity must be greater than 0' })
      .optional(),

    brand: z
      .string({
        invalid_type_error: 'Brand must be a string',
      })
      .optional(),

    model_number: z
      .string({
        invalid_type_error: 'Model Number must be a string',
      })
      .optional(),

    category: z
      .string({
        invalid_type_error: 'Category must be a string',
      })
      .optional(),

    operating_system: z
      .string({
        invalid_type_error: 'Operating System must be a string',
      })
      .optional(),

    connectivity: z
      .string({
        invalid_type_error: 'Connectivity must be a string',
      })
      .optional(),

    power_source: z
      .string({
        invalid_type_error: 'Power Source must be a string',
      })
      .optional(),

    warranty: z
      .number({
        invalid_type_error: 'Warranty must be a number',
      })
      .optional(),

    weight: z
      .number({
        invalid_type_error: 'Weight must be a number',
      })
      .optional(),

    screen_resolution: z
      .string({
        invalid_type_error: 'Screen Resolution must be a string',
      })
      .optional(),

    camera_resolution: z
      .string({
        required_error: 'Camera Resolution is required',
        invalid_type_error: 'Camera Resolution must be a string',
      })
      .optional(),

    storage_capacity: z
      .string({
        invalid_type_error: 'Storage Capacity must be a string',
      })
      .optional(),
  }),
});

const ProductValidations = {
  productValidationSchema,
  updateProductValidationSchema,
};

export default ProductValidations;
