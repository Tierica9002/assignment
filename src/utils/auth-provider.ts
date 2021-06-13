import Cookie from "js-cookie";
import { client, ResponseCodes } from "./api-client";
export interface AuthResponse {
  token?: string;
  message?: string;
}

const DEFAULT_COOKIE_EXPIRE = 1;
const COOKIE_TOKEN_KEY = "auth_token";

const login = (username: string, password: string): Promise<AuthResponse> => {
  return client("tokens", {
    data: {
      username,
      password,
    },
  }).then(async (response) => {
    const resp = await response.json();

    if (response.status === ResponseCodes.OK) {
      if (resp.token) {
        Cookie.set(COOKIE_TOKEN_KEY, resp.token, {
          expires: DEFAULT_COOKIE_EXPIRE,
        });
      } else {
        throw new Error("Server response did not contain a token.");
      }
    }

    return {
      token: resp.token,
      message: resp.message,
    };
  });
};

const logout = (sessionExpired = false): void => {
  Cookie.remove(COOKIE_TOKEN_KEY);
  const sessionExpiredStr = sessionExpired ? "#session_expired" : "";
  window.location.replace(`/login${sessionExpiredStr}`);
};

const getToken = (): string => {
  return Cookie.get(COOKIE_TOKEN_KEY) || "";
};

export { login, logout, getToken };
