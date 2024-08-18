'use client';
import { signOut, useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

export const Navbar = () => {
  const session = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = () => {
    setIsSigningIn(true);
    router.push('/signin');
  };

  const handleSignOut = () => {
    setIsLoading(true);
    signOut({ redirect: true, callbackUrl: '/' });
  };

  const handleEdit = () => {
    setIsEdit(true)
    router.push(`/form?id=${session?.data?.user.id}`)
  }

  useEffect(() => {
    if (isEdit && pathname?.startsWith('/form')) {
      setIsEdit(false);
    }

    if (isSigningIn && pathname === '/signin') {
      setIsSigningIn(false);
    }

  }, [pathname, isEdit, isSigningIn]);
  return (
    <div className="flex justify-between items-center font-semibold bg-background shadow-md px-4 py-3 top-0 sticky z-10">
      <div className="flex justify-center items-center font-semibold text-2xl">
        <h1 className="mx-2">ProfileFolio</h1>
      </div>
      <div className="flex gap-2 justify-evenly items-center">
        {session.status === 'authenticated' ? (
          <div className='flex items-center gap-4'>
            <Button
              onClick={handleEdit}
              type='button'
              variant='default'
              disabled={pathname?.startsWith('/form')}
            >
              {isEdit ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                'Edit'
              )}
            </Button>

            <Button variant="default" type='button' onClick={handleSignOut} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                'Sign out'
              )}
            </Button>{' '}
          </div>
        ) : (
          <Button variant="default" type='button' onClick={handleSignIn} disabled={pathname === '/signin' || isSigningIn}>
            {isSigningIn ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              'Sign in'
            )}
          </Button>
        )}
      </div>
    </div>
  );
};
