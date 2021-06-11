import { logout } from "./auth-provider";

const apiURL = process.env.API_URL;

export enum ResponseCodes {
  UNAUTHORIZED = 401,
  OK = 200,
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
): Promise<Response> {
  const config: RequestInit = {
    method: data ? "POST" : "GET",
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...customHeaders,
    },
    ...customConfig,
  };

  return window
    .fetch(`${apiURL}/${endpoint}`, config)
    .then((response: Response) => {
      if (token && response.status === ResponseCodes.UNAUTHORIZED) {
        logout();
        return Promise.reject({ message: "Your session has expired" });
      }
      return response;
    });
}

export { client };
