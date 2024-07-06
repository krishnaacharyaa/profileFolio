import { z } from 'zod';
import { UserSchema } from '../app/zod/user-zod';

type User = z.infer<typeof UserSchema>;

export type { User };
