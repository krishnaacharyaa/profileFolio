import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../helper/auth';
import Signup from '../components/signup-form';
;

const SignupPage = async () => {
  const session = await getServerSession(authOptions);
  
  if (session?.user) {
    redirect('/home');
  }
  else{

    return <Signup />;
  }
 
};

export default SignupPage;