'use server';

import { fetchWithLogging } from '../helper/logger';
import { SkillRef } from '../types/skillRef';
import { User } from '../types/user';

export async function getUserData() {
  const response = await fetchWithLogging<User>('http://localhost:8080/api/user', {
    // This no-store should be removed in future and replaced with revalidateTag,
    // Adding now because it is wieredly caching the response, changes in the 8080/api/user is not reflected here if no-store isn't added
    cache: 'no-store',
  });
  return response.response;
}

export async function getSkillsData() {
  const response = await fetchWithLogging<SkillRef[]>('http://localhost:8080/api/skills', {
    // This no-store should be removed in future and replaced with revalidateTag,
    cache: 'no-store',
  });
  return response.response;
}
