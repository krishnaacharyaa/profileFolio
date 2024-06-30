import { z } from 'zod';
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export const signUpSchema = z
  .object({
    userName: z.string().min(1, { message: 'Username is required' }),
    email: z.string().email('Enter valid email'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 character')
      .regex(
        passwordRegex,
        'Password must be contains at least one uppercase and one lowercase and one digit and one special character'
      ),
    confirmPassword: z.string().min(1, { message: 'Confirm Password is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Confirm Password do not match',
    path: ['confirmPassword'],
  });

  export type TSignUpSchema = z.infer<typeof signUpSchema>;