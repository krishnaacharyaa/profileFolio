

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

import { authOptions } from '../helper/auth';
import Signin from '../components/signin-form';

const SigninPage = async () => {
  const session = await getServerSession(authOptions);
  
  if (session?.user) {
    redirect('/home');
  }
  else{

    return <Signin/>;
  }
 
};

export default SigninPage;