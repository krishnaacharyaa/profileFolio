'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import axios from 'axios';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signUpSchema, TSignUpSchema } from '@/app/zod/signup-zod';
import { signIn } from 'next-auth/react';
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

function Signup() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TSignUpSchema>({ resolver: zodResolver(signUpSchema) });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const onSubmit = async (data: TSignUpSchema) => {
    try {
      const res = await axios.post(`${backendUrl}/api/signup`, data);
      toast.success('sucessfully registered', {
        position: 'top-center',
      });

      await signIn("credentials", {
        username: data.email,
        password: data.password,
        redirect: false
      })

      router.push('/form');

      //signIn();
    } catch (error) {
      toast.error('failed', {
        position: 'top-center',
      });
    }
  };

  /*const handleSignInClick = () => {
    signIn();
  };*/

  return (
    <div className="flex-grow cursor-default bg-white py-4 ">
      <div className="m-4 mb-4 flex justify-center">
        <div className="flex w-full items-center justify-center">
          <h2 className="text-center text-lg font-bold text-black  w-2/4 pl-2 sm:text-xl md:w-3/4 ">
            Sign up
          </h2>
        </div>
      </div>
      <div className="m-2 mt-8 flex flex-col items-center justify-center gap-2">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-3/4 lg:w-2/5">
          <div className="mb-2">
            <Input
              {...register('userName', { required: true })}
              type="text"
              placeholder="Username"
            />
            {errors.userName && (
              <p className="p-3 text-xs text-red-500">{`${errors.userName.message}`}</p>
            )}
          </div>

          <div className="mb-2">
            <Input {...register('email', { required: true })} type="email" placeholder="Email" />

            {errors.email && (
              <p className="p-3 text-xs text-red-500">{`${errors.email.message}`}</p>
            )}
          </div>

          <div className="relative mb-2">
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
            {errors.password && (
              <p className="p-3 text-xs text-red-500">{`${errors.password.message}`}</p>
            )}
          </div>

          <div className="relative mb-4">
            <Input
              {...register('confirmPassword', { required: true })}
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Confirm Password"
            />

            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 h-12 text-sm leading-5"
            >
              <img
                src={passwordVisible ? '/svg/eye-off.svg' : '/svg/eye.svg'}
                alt="Toggle Confirm Password Visibility"
                className="h-5 w-5"
              />
            </button>
            {errors.confirmPassword && (
              <p className="p-3 text-xs text-red-500">{`${errors.confirmPassword.message}`}</p>
            )}
          </div>
          <button
            disabled={isSubmitting}
            type="submit"
            className="flex w-full items-center justify-center rounded-lg bg-neutral-800 p-3 text-base font-medium text-white disabled:bg-neutral-600 sm:text-lg sm:font-semibold"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-2 flex w-5/6 flex-col items-center justify-center gap-4 text-center text-sm font-normal dark:text-dark-primary sm:text-base">
          <p>
            Already have an account?
            <Link href={'/signin'} className="text-blue-600 hover:text-blue-500">
              {' '}
              Log in now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
