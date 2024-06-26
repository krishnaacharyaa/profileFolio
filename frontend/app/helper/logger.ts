import { z } from 'zod';

export async function fetchAndValidate<T>(
  url: string,
  options: RequestInit,
  schema: z.ZodSchema<T>
): Promise<T> {
  const startTime = new Date().toISOString();
  const response = await fetch(url, options);

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
