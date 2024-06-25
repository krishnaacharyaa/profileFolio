'use server';
export async function getUserData() {
  const res = await fetch('http://localhost:8080/api/user');

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
