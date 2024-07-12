import { authOptions } from '@/lib/auth';
import axios from 'axios';
import { getServerSession } from 'next-auth';

export async function GET(req: Request) {
  const email = new URL(req.url).searchParams.get('email');

  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  const token = session.token;

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/email/${email}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.response.data }), {
      status: error.response.status,
    });
  }
}
