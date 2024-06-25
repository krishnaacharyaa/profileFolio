import { z } from 'zod';
import { UserSchema } from '../zod/user-zod';

type User = z.infer<typeof UserSchema>;

export type { User };
