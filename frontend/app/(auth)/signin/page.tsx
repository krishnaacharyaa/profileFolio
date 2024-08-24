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
import { Eye, EyeOff, Loader2 } from 'lucide-react';

type TSignInSchema = z.infer<typeof loginSchema>;
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

export default function Signin() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignInSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleonSubmit = async (data: FieldValues) => {
    try {
      setIsLoading(true)
      const res = await axios.post(`${backendUrl}/api/signin`, data);
      if (res.status === 200) {
        const response = await signIn('credentials', {
          redirect: false,
          email: data.email,
          password: data.password,
        });

        if (response?.error) {
          toast.error(response.error, {
            position: 'top-center',
          });
        }
        if (response?.ok) {
          toast.success('Login Success', {
            position: 'top-center',
          });
          reset();
          router.replace('/dashboard');
        }
      }
    } catch (error: any) {
      setIsLoading(false)
      toast.error(error?.response?.data, {
        position: 'top-center',
      });
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
                  {
                    passwordVisible ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )
                  }
                </Button>
              </div>
              <p className="px-2 text-xs text-red-500">{errors.password?.message}</p>
            </div>
            <Button type="submit" disabled={isSubmitting || isLoading} className="w-full">
              {
                isLoading ? (
                  <>
                    redirect to dashboard {' '} <Loader2 className="animate-spin h-5 w-5" />
                  </>
                ) : (
                  'Log In'
                )
              }
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
