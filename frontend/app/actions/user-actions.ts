'use server';

import { fetchWithLogging } from '../helper/logger';

export async function getUserData() {
  // This no-store should be remove in future and replaced with revalidateTag,
  // Adding now because it is wieredly caching the response, changes in the 8080/api/user is not reflected here if no-store isn't added
  const response = await fetchWithLogging('http://localhost:8080/api/user', { cache: 'no-store' });
  return response.response;
}

export async function getSkillsData() {
  // This no-store should be remove in future and replaced with revalidateTag,
  // Adding now because it is wieredly caching the response, changes in the 8080/api/user is not reflected here if no-store isn't added
  const response = await fetchWithLogging('http://localhost:8080/api/skills', {
    cache: 'no-store',
  });
  return response.response;
}
