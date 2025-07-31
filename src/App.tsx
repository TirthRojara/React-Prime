import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { QueryClientProvider } from "@tanstack/react-query"
import { QueryClient } from '@tanstack/react-query';

import HomePage from "./pages/HomePage";

export const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: "*",
    element: (
      <div className="h-screen w-screen flex items-center justify-center text-7xl">
        404 Not Found
      </div>
    )
  }
]);


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
