import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./auth-context";

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProviders = ({ children }: AppProviderProps): JSX.Element => {
  return (
    <AuthContextProvider>
      <Router>{children}</Router>
    </AuthContextProvider>
  );
};

export { AppProviders };
