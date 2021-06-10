const apiURL = process.env.API_URL;

export enum ResponseCodes {
  UNAUTHORIZED = 401,
}

interface ClientConfig {
  data?: Record<string, unknown>;
  token?: string;
  headers?: HeadersInit;
  [key: string]: unknown;
}

async function client(
  endpoint: string,
  { data, token, headers: customHeaders, ...customConfig }: ClientConfig = {}
): Promise<Record<string, unknown>> {
  const config: RequestInit = {
    method: data ? "POST" : "GET",
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...customHeaders,
    },
    ...customConfig,
  };

  return window
    .fetch(`${apiURL}/${endpoint}`, config)
    .then(async (response) => {
      return await response.json();
    });
}

export { client };
