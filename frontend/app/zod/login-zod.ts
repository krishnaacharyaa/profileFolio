import z from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4, { message: 'Password must be atleast 4 characters long.' }),
});

export type User = z.infer<typeof loginSchema>;
