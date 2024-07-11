import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import Signup from '@/components/auth/SigupForm';
const SignupPage = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect('/dashboard');
  } else {
    return <Signup />;
  }
};

export default SignupPage;
