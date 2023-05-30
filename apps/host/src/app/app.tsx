import * as React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import { MantineProvider } from '@mantine/core';
import Banner from './components/banner/Banner';
import { CenterLoader, GrayContainer } from '@pizza-app/ui-shared';
import { theme } from '@pizza-app/ui-shared';
import { StoreProvider } from '@pizza-app/redux-store';
import Footer from './components/footer/Footer';
import { footerData } from './constants/footerConfig';

const Shop = React.lazy(() => import('shop/Module'));
const Auth = React.lazy(() => import('./components/auth/Auth'));
const Cart = React.lazy(() => import('./components/cart/Cart'));

const App = () => {
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
        <BrowserRouter>
          <Navbar />
          <GrayContainer>
            <React.Suspense fallback={<CenterLoader />}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <Banner />
                      <Shop />
                    </>
                  }
                />
                <Route
                  path="/cart/*"
                  element={
                    <React.Suspense fallback={<CenterLoader />}>
                      <Cart />
                    </React.Suspense>
                  }
                />
                <Route path="/shop/*" element={<></>} />
                <Route
                  path="/user/*"
                  element={
                    <React.Suspense fallback={<CenterLoader />}>
                      <Auth />
                    </React.Suspense>
                  }
                />
              </Routes>
            </React.Suspense>
          </GrayContainer>
          <Footer data={footerData} />
        </BrowserRouter>
      </MantineProvider>
    </StoreProvider>
  );
};

export default App;
