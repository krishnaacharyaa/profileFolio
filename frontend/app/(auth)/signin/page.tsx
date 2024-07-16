'use client';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { loginSchema } from '@/app/zod/login-zod';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import axios from 'axios';

type TSignInSchema = z.infer<typeof loginSchema>;
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

export default function Signin() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<TSignInSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const handleonSubmit = async (data: FieldValues) => {
    try {
      const res = await axios.post(`${backendUrl}/api/signin`, data);
      if (res.status === 200) {
        toast.success("Login Success", {
          position: 'top-center'
        })
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
          reset()
          router.replace('/dashboard')
        }
      }
    } catch (error: any) {
      toast.error(error?.response?.data, {
        position: 'top-center'
      })
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      await signIn(
        'google',
        { callbackUrl: `${window.location.origin}/home` },
        { prompt: 'login' }
      );
    } catch (error) {
      console.error('Failed to sign in with Google:', error);
    }
  };

  const handleSignInWithGithub = async () => {
    try {
      await signIn(
        'github',
        { callbackUrl: `${window.location.origin}/home` },
        { prompt: 'login' }
      );
    } catch (error) {
      console.error('Failed to sign in with Github:', error);
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

  function ChromeIcon(props: any) {
    return (
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
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
        <line x1="21.17" x2="12" y1="8" y2="8" />
        <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
        <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
      </svg>
    );
  }

  function GithubIcon(props: any) {
    return (
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
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    );
  }

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-between gap-12 lg:flex-row">
        <div className="flex flex-col items-start justify-center space-y-6 lg:max-w-[500px]">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Welcome Back
            </h1>
            <p className="text-muted-foreground md:text-xl">
              Sign in to access your ProfileFolio account. Manage your portfolios, resumes, and
              GitHub READMEs with ease.
            </p>
          </div>
        </div>
        <div className="w-full max-w-md rounded-lg border bg-card p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold">Sign In</h2>
          <form onSubmit={handleSubmit(handleonSubmit)} className="space-y-3">
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
            <Button type="submit" disabled={isSubmitting} className="w-full">
              Log In
            </Button>
          </form>
          <div className="my-4 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link
              href="/signup"
              className="font-medium underline underline-offset-4"
              prefetch={false}
            >
              Sign up now
            </Link>
          </div>
          {/* <div className="flex flex-col gap-2">
            <Button variant="outline" onClick={handleSignInWithGoogle} className="flex gap-2">
              <ChromeIcon className="h-5 w-5" />
              Continue with Google
            </Button>
            <Button variant="outline" onClick={handleSignInWithGithub} className="flex gap-2">
              <GithubIcon className="h-5 w-5" />
              Continue with Github
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
