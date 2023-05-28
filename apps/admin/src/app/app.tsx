import { CenterLoader, GrayContainer } from '@pizza-app/ui-shared';
import * as React from 'react';
import { Route, Routes, BrowserRouter, Link } from 'react-router-dom';
import AppShell from './components/AppShell/AppShell';
import { MantineProvider } from '@mantine/core';
import { StoreProvider } from '@pizza-app/redux-store';
import { theme } from '@pizza-app/ui-shared';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';

export function App() {
  return (
    <StoreProvider>
      <MantineProvider
        withNormalizeCSS
        withGlobalStyles
        theme={{
          fontFamily: theme.fontFamily,
          colors: theme.colors as Record<string, any>,
          primaryColor: theme.primaryColor,
        }}
      >
        <React.Suspense fallback={<CenterLoader />}>
          <GrayContainer>
            <AppShell>
              <Routes>
                <Route
                  path="/"
                  element={
                    <div>
                      <Link to={'home'}>HIi welcome to admin panel</Link>
                    </div>
                  }
                />
                <Route path="/home" element={<Home />} />
              </Routes>
            </AppShell>
          </GrayContainer>
        </React.Suspense>
        <Footer />
      </MantineProvider>
    </StoreProvider>
  );
}

export default App;
