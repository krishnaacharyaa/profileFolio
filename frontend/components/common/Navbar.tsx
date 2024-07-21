'use client';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

export const Navbar = () => {
  const session = useSession();
  const router = useRouter();
  return (
    <div className="flex justify-between items-center font-semibold bg-background shadow-md px-4 py-3 top-0 sticky z-10">
      <div className='font-semibold text-2xl'>ProfileFolio</div>
      <div className="flex gap-2 justify-evenly items-center">
        {session.status === 'authenticated' ? (
          <>
            {' '}
            <p className='text-primary'>{session.data.user?.email}</p>{' '}
            <Button className='' onClick={() => signOut({ redirect: true, callbackUrl: '/' })}>Sign out</Button>{' '}
          </>
        ) : (
          <Button className='' onClick={() => router.push('/signin')}>Sign in</Button>
        )}
      </div>
    </div>
  );
};
