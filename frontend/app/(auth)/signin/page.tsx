import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

import { authOptions } from '@/lib/auth';
import Signin from '@/components/auth/SiginForm';

const SigninPage = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect('/dashboard');
  } else {
    return <Signin />;
  }
};

export default SigninPage;
