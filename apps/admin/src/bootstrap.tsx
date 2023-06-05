import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/app';
import { Toaster } from 'react-hot-toast';
import { StoreProvider } from '@pizza-app/redux-store';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@pizza-app/ui-shared';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <StoreProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
          <Toaster position="top-right" />
        </BrowserRouter>
      </QueryClientProvider>
    </StoreProvider>
  </StrictMode>
);
