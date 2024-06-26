type FetchResponse<T> = {
  time: string;
  api: string;
  method: string;
  response: T;
};

export async function fetchWithLogging<T>(
  url: string,
  options: RequestInit
): Promise<FetchResponse<T>> {
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

  const logData: FetchResponse<T> = {
    time: startTime,
    api: url,
    method: options.method || 'GET',
    response: result,
  };

  console.log(logData);

  return logData;
}
