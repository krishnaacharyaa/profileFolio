'use client';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { loginSchema } from '@/app/zod/login-zod';
type FormData = z.infer<typeof loginSchema>;

export default function Signin() {
  const router = useRouter();

  const params = useSearchParams();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });
  const handleonSubmit = async (data: FormData) => {
    console.log(data);

    const res = await signIn('credentials', {
      username: data?.email,
      password: data?.password,
      redirect: false,
    });

    if (res?.error) {
      toast.error('invalid credentials', {
        position: 'top-center',
      });
    } else {
      router.push('/dashboard');
    }
  };
  const handleSignInWithGoogle = async () => {
    try {
      await signIn(
        'google',
        { callbackUrl: `${window.location.origin}/home` },
        { prompt: 'login' }
      );
      // Optionally handle success or redirection after sign-in
    } catch (error) {
      console.error('Failed to sign in with Google:', error);
      // Handle error as needed
    }
  };
  const handlegithub = async () => {
    try {
      await signIn(
        'github',
        { callbackUrl: `${window.location.origin}/home` },
        { prompt: 'login' }
      );
      // Optionally handle success or redirection after sign-in
    } catch (error) {
      console.error('Failed to sign in with Google:', error);
      // Handle error as needed
    }
  };

  return (
    <div className="flex-grow cursor-default bg-white py-4 dark:bg-dark-card">
      <p>{params?.get('error')}</p>
      <div className="m-4 mb-4 flex justify-center">
        <div className="flex w-full items-center justify-center">
          <h2 className="text-center text-lg font-bold text-black dark:text-dark-primary w-2/4 pl-2 sm:text-xl md:w-3/4 md:pl-48">
            Sign in
          </h2>
          <div className="flex items-center justify-end px-4 sm:px-20"></div>
        </div>
      </div>
      <div className="m-2 mt-8 flex flex-col items-center justify-center gap-2">
        <form onSubmit={handleSubmit(handleonSubmit)} className="w-full md:w-3/4 lg:w-2/5">
          <div className="mb-2">
            <Input {...register('email', { required: true })} type="text" placeholder="Email" />
          </div>
          {errors?.email && <p className="text-red-600 text-sm">{errors?.email?.message}</p>}
          <div className="mb-4 flex flex-col">
            <div className="relative">
              <Input
                {...register('password', { required: true })}
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 h-12  text-sm leading-5"
              >
                <img
                  src={passwordVisible ? '/svg/eye-off.svg' : '/svg/eye.svg'}
                  alt="Toggle Password Visibility"
                  className="h-5 w-5"
                />
              </button>
            </div>
            {errors?.password && (
              <p className="text-red-600 text-sm">{errors?.password?.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-lg bg-neutral-800 p-3 text-base font-medium text-light disabled:bg-neutral-600  dark:bg-light dark:text-dark dark:hover:bg-dark-secondary/80 sm:text-lg sm:font-semibold"
          >
            Log In
          </button>
        </form>
        <div className="mt-2 flex w-5/6 flex-col items-center justify-center gap-4 text-center text-sm font-normal dark:text-dark-primary sm:text-base">
          <p>
            Don't have an account?
            <Link href={'/signup'} className="text-blue-600 hover:text-blue-500">
              {' '}
              Sign up now
            </Link>
          </p>

          {/* <span>OR</span> */}
        </div>

        <button
          onClick={handleSignInWithGoogle}
          className="flex w-full items-center justify-center space-x-2 rounded-lg border-2 border-b-4  border-gray-300 p-3 text-center hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 md:w-3/4 lg:w-2/5"
        >
          <span className="text-sm dark:text-dark-primary sm:text-base">Continue with Google</span>
        </button>

        <button
          onClick={handlegithub}
          className="flex w-full items-center justify-center space-x-2 rounded-lg border-2 border-b-4 border-gray-300 p-3 text-center hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 md:w-3/4 lg:w-2/5"
        >
          <span className="text-sm dark:text-dark-primary sm:text-base">Continue with Github</span>
        </button>
      </div>
    </div>
  );
}
