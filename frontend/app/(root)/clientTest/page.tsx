'use client';

import useApi from '@/hooks/useClientHook';
import { useSession } from 'next-auth/react';

export default function page() {
  const { data: session } = useSession();

  const { data, loading, error } = useApi(`/api/user/${session?.user?.id}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {String(error?.response?.data ?? error.message)}</div>;
  if (!data) return <div>No user data found</div>;

  return (
    <div>
      <h1>Welcome,{data?.basics?.name}!</h1>
    </div>
  );
}
