import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

const Page = async () => {
  const session: any = await getServerSession(authOptions);
  console.log(session);
  try {
    const response = await fetch(
      'http://localhost:8080/api/user/email/prathmeshdupare2501@gmail.com',
      {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    console.log(data);

    return (
      <>
        <div>hello</div>
      </>
    );
  } catch (error) {
    console.error('Error fetching user data:', error);
    return (
      <>
        <div>hello</div>
      </>
    );
  }
};

export default Page;
