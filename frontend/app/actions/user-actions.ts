'use server';
export async function getUserData() {
  // This no-store should be remove in future and replaced with revalidateTag,
  // Adding now because it is wieredly caching the response, changes in the 8080/api/user is not reflected here if no-store isn't added
  const res = await fetch('http://localhost:8080/api/user', { cache: 'no-store' });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.log({ res });
    throw new Error('Failed to fetch data');
  }
  const result = await res.json();
  console.log(result);
  return result;
}
