import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

export async function fetchAndValidate<T>(
  url: string,
  options: RequestInit,
  schema: z.ZodSchema<T>
): Promise<T> {
  const startTime = new Date().toISOString();

  // Get the session to extract the token
  const session: any = await getServerSession(authOptions);
  if (!session || !session.token) {
    throw new Error('No session or token found');
  }

  // Include the token in the headers
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  });
  console.log(response);

  if (!response.ok) {
    console.log({
      time: startTime,
      api: url,
      method: options.method || 'GET',
      response: `Error: ${response.statusText}`,
    });
    throw new Error(`Failed to fetch data from ${url}`);
  }

  const result = await response.json();

  // Validate the response using zod schema
  const validation = schema.safeParse(result);
  if (!validation.success) {
    console.error('Validation Error:', validation.error);
    // throw new Error(`Validation failed for response from ${url}`);
  }
  console.log({
    time: startTime,
    api: url,
    method: options.method || 'GET',
    response: result,
  });

  // return validation.data;
  return result;
}
