import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProviders = ({ children }: AppProviderProps): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export { AppProviders };
