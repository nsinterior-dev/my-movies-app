export async function apiRequest<TRequest, TResponse>(
  url: string,
  method: 'get' | 'post' | 'put' | 'delete',
  body?: TRequest,
): Promise<TResponse> {
  console.log(`Making ${method.toUpperCase()} request to: ${url}`);
  const response = await fetch(url, {
    method: method.toUpperCase(),
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`Failed to ${method} data from ${url}`);
  }

  return response.json();
}
