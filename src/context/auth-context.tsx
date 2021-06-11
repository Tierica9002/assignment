import React from "react";
import * as authProvider from "../utils/auth-provider";

type AuthContext =
  | {
      token: string;
      login: (
        username: string,
        password: string
      ) => Promise<authProvider.AuthResponse>;
    }
  | Record<string, never>;

const AuthContext = React.createContext<AuthContext>({});

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const AuthContextProvider = (props: AuthContextProviderProps): JSX.Element => {
  const [token, setToken] = React.useState(authProvider.getToken());

  const login = (
    username: string,
    password: string
  ): Promise<authProvider.AuthResponse> => {
    return authProvider.login(username, password).then((resp) => {
      if (resp.token) {
        setToken(token);
        return resp;
      }

      return resp;
    });
  };

  return <AuthContext.Provider value={{ login, token }} {...props} />;
};

const useAuth = (): AuthContext => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
};

export { AuthContextProvider, useAuth };
