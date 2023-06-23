import * as React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import { MantineProvider } from '@mantine/core';
import {
  CenterLoader,
  ErrorBoundary,
  GrayContainer,
  NotFoundPage,
} from '@pizza-app/ui-shared';
import { theme } from '@pizza-app/ui-shared';
import { useUserStore } from '@pizza-app/redux-store';
import Footer from './components/footer/Footer';
import { footerData } from './constants/footerConfig';
import Home from './components/home/Home';
import Orders from './components/orders/Orders';
import OrderDetails from './components/orders/OrderDetails';
import ProtectedRoute from './components/ProtectedRoute';
import { checkAuth } from './utils/api';

const Auth = React.lazy(() => import('./components/auth/Auth'));
const Cart = React.lazy(() => import('./components/cart/Cart'));

const App = () => {
  //getting the isAuth if it is false then getting the user (token validation) and adding the user in store
  const { isAuth, addUser } = useUserStore();
  const navigate = useNavigate();
  React.useEffect(() => {
    async function authOrNot() {
      try {
        const { data } = await checkAuth();
        addUser({
          name: data.user.name,
          email: data.user.email.toLowerCase(),
          photo: data.user.photo,
          TOKEN: data.TOKEN,
          isAuth: true,
        });
        navigate('/');
      } catch (err) {
        return;
      }
    }
    if (!isAuth) {
      authOrNot();
    }
  }, [isAuth]);

  return (
    <MantineProvider
      withNormalizeCSS
      withGlobalStyles
      theme={{
        fontFamily: theme.fontFamily,
        colors: theme.colors as Record<string, any>,
        primaryColor: theme.primaryColor,
      }}
    >
      <Navbar />
      <GrayContainer>
        <React.Suspense fallback={<CenterLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/cart/*"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:orderId"
              element={
                <ProtectedRoute>
                  <OrderDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/*"
              element={
                <ErrorBoundary>
                  <Auth />
                </ErrorBoundary>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </React.Suspense>
      </GrayContainer>
      <Footer data={footerData} />
    </MantineProvider>
  );
};

export default App;
