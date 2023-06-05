import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import './styles.css';
import App from './app/app';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@pizza-app/ui-shared';
import { StoreProvider } from '@pizza-app/redux-store';

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
