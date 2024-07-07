'use client';
import { signOut, useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';

export const Navbar = () => {
  const session = useSession();
  const router = useRouter();
  return (
    <div className="flex justify-between items-center h-8 font-semibold bg-blue-300 px-4 top-0 sticky z-10">
      <div>ProfileFolio</div>
      <div className="flex gap-2 justify-evenly items-center">
        {session.status === 'authenticated' ? (
          <>
            {' '}
            <p>{session.data.user?.email}</p>{' '}
            <button onClick={() => signOut({ redirect: true, callbackUrl: '/' })}>Sign out</button>{' '}
          </>
        ) : (
          <button onClick={() => router.push('/signin')}>Sign in</button>
        )}
        <div>Resume</div>
        <div>Portfolio</div>
        <div>Profile</div>
      </div>
    </div>
  );
};
