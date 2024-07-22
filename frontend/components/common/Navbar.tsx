'use client';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

export const Navbar = () => {
  const session = useSession();
  const router = useRouter();
  return (
    <div className="flex justify-between items-center font-semibold bg-background shadow-md px-4 py-3 top-0 sticky z-10">
      <div className='flex justify-center items-center font-semibold text-2xl'>
        <div className="mx-2">ProfileFolio</div>
        <Button onClick={() => {
        router.push(`/form?id=${session?.data?.user.id}`)
      }}>Edit</Button>
      </div>
      <div className="flex gap-2 justify-evenly items-center">
        {session.status === 'authenticated' ? (
          <>
            {' '}
            <p className='text-primary'>{session.data.user?.email}</p>{' '}
            <Button variant='default' onClick={() => signOut({ redirect: true, callbackUrl: '/' })}>Sign out</Button>{' '}
          </>
        ) : (
          <Button variant='default' onClick={() => router.push('/signin')}>Sign in</Button>
        )}
      </div>
    </div>
  );
};
