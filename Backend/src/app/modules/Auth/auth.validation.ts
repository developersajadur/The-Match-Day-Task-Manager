import z from 'zod';

const loginUserValidationSchema = z.object({
  body: z.object({
    email: z
      .string()
      .min(1, 'Email is required.')
      .email()
      .min(1, 'Invalid email address'),
    password: z.string().min(6, 'Password is required'),
  }),
});

export const authValidation = {
  loginUserValidationSchema,
};
