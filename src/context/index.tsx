import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./auth-context";

const queryClient = new QueryClient();

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProviders = ({ children }: AppProviderProps): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Router>{children}</Router>
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

export { AppProviders };
