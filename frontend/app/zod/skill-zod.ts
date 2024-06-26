import { z } from 'zod';

export const SkillRefSchema = z.object({
  id: z.string(),
  name: z.string(),
});
