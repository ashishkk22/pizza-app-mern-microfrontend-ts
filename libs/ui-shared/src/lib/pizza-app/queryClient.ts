import { QueryClient } from '@tanstack/react-query';

//query client of react-query with default options
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      retry: 3,
      staleTime: 3 * 1000 * 1000,
    },
  },
});
