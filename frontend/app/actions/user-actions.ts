'use server';
export async function getUserData() {
  // This no-store should be remove in future and replaced with revalidateTag,
  // Adding now because it is wieredly caching the response, changes in the 8080/api/user is not reflected here if no-store isn't added
  const user = await fetch('http://localhost:8080/api/user', { cache: 'no-store' });
  if (!user.ok) {
    console.log({ user });
    throw new Error('Failed to fetch data');
  }
  const result = await user.json();
  console.log(result);
  return result;
}

export async function getSkillsData() {
  // This no-store should be remove in future and replaced with revalidateTag,
  // Adding now because it is wieredly caching the response, changes in the 8080/api/user is not reflected here if no-store isn't added
  const skills = await fetch('http://localhost:8080/api/skills', { cache: 'no-store' });
  if (!skills.ok) {
    console.log({ skills });
    throw new Error('Failed to fetch data');
  }
  const result = await skills.json();
  console.log(result);
  return result;
}
