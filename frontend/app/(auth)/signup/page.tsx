'use client';

import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import axios from 'axios';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signUpSchema, TSignUpSchema } from '@/app/zod/signup-zod';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

function Signup() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await axios.post(`${backendUrl}/api/signup`, data);
      if (res.status === 201) {
        const response = await signIn('credentials', {
          redirect: false,
          email: data.email,
          password: data.password,
        })

        if (response?.error) {
          toast.error(response.error, {
            position: 'top-center'
          })
        }
        if (response?.ok) {
          toast.success(res.data?.message, {
            position: 'top-center'
          })
          reset()
          router.replace('/form')
        }
      }
    } catch (error: any) {
      toast.error(error?.response?.data, {
        position: 'top-center'
      })
    }
  };

  const EyeIcon = (props: any) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-between gap-12 lg:flex-row">
        <div className="flex flex-col items-start justify-center space-y-6 lg:max-w-[500px]">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Elevate Your Professional Presence
            </h1>
            <p className="text-muted-foreground md:text-xl">
              Create stunning portfolios, resumes, and GitHub READMEs with ProfileFolio. Join now
              and showcase your skills with our intuitive and powerful platform.
            </p>
          </div>
          <div className="flex w-full flex-col items-start gap-4 sm:flex-row">
            <Button className="w-full sm:w-auto">Get Started</Button>
            <Button variant="outline" className="w-full sm:w-auto">
              Learn More
            </Button>
          </div>
        </div>
        <div className="w-full max-w-md rounded-lg border bg-card p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold">Create an account</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="userName">Username</Label>
              <Input
                {...register('userName', { required: true })}
                id="userName"
                placeholder="John Doe"
              />
              <p className="px-2 text-xs text-red-500">{errors.userName?.message}</p>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register('email', { required: true })}
                id="email"
                type="email"
                placeholder="john@example.com"
              />
              <p className="px-2 text-xs text-red-500">{errors.email?.message}</p>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  {...register('password', { required: true })}
                  id="password"
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Password"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  <EyeIcon className="h-5 w-5" />
                </Button>
              </div>
              <p className="px-2 text-xs text-red-500">{errors.password?.message}</p>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  {...register('confirmPassword', { required: true })}
                  id="confirmPassword"
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Confirm Password"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  <EyeIcon className="h-5 w-5" />
                </Button>
              </div>
              <p className="px-2 text-xs text-red-500">{errors.confirmPassword?.message}</p>
            </div>

            <Button disabled={isSubmitting} type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link
              href="/signin"
              className="font-medium underline underline-offset-4"
              prefetch={false}
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
