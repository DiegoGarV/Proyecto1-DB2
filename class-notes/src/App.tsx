import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostList from "./components/PostList"; // Asegúrate de que sea la ruta correcta

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PostList />
    </QueryClientProvider>
  );
}

export default App;
