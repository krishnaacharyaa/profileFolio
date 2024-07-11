'use client';
import { signOut, useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';

export const Navbar = () => {
  const session = useSession();
  const router = useRouter();
  return (
    <div className="flex justify-between items-center font-semibold bg-slate-800 px-4 py-3 top-0 sticky z-10">
      <div className="text-slate-100 font-semibold text-2xl">ProfileFolio</div>
      <div className="flex gap-2 justify-evenly items-center">
        {session.status === 'authenticated' ? (
          <>
            {' '}
            <p className='text-white'>{session.data.user?.email}</p>{' '}
            <button
              className="w-fit bg-slate-100 text-slate-800 rounded-md px-2 py-1"
              onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
            >
              Sign out
            </button>{' '}
          </>
        ) : (
          <button
            className="w-fit bg-slate-100 text-slate-800 rounded-md px-2 py-1"
            onClick={() => router.push('/signin')}
          >
            Sign in
          </button>
        )}
      </div>
    </div>
  );
};
