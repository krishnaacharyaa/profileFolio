'use server';
import { z } from 'zod';

import { fetchAndValidate } from '../helper/logger';
import { SkillRef } from '../types/skillRef';
import { User } from '../types/user';
import { SkillRefSchema } from '../zod/skill-zod';
import { UserSchema } from '../zod/user-zod';
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';
export async function getUserData(): Promise<User> {
  // This no-store should be removed in future and replaced with revalidateTag,
  // Adding now because it is wieredly caching the response, changes in the 8080/api/user is not reflected here if no-store isn't added

  console.log(backendUrl);
  return fetchAndValidate<User>(`${backendUrl}/api/user`, { cache: 'no-store' }, UserSchema);
}

export async function getSkillsData(): Promise<SkillRef[]> {
  return fetchAndValidate<SkillRef[]>(
    `${backendUrl}/api/skills`,
    { cache: 'no-store' },
    z.array(SkillRefSchema)
  );
}
