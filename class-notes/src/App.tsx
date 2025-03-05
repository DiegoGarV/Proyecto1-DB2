import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./routes/Router";

const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <AppRouter />
  </QueryClientProvider>
);

export default App;
