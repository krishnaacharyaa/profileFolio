'use client';

import { useEffect, useState } from 'react';

export default function TestPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const username = 'jojosan2@gmail.com'; // Replace with the actual email you want to query
      const response = await fetch(`/api/email?email=${username}`);
      if (response.ok) {
        const userData = await response.json();
        setData(userData);
      } else {
        console.error('Failed to fetch user data');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Test Page</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
}
