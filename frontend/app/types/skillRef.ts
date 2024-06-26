import { z } from 'zod';
import { SkillRefSchema } from '../zod/skill-zod';

type SkillRef = z.infer<typeof SkillRefSchema>;

export type { SkillRef };
