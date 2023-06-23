import {
  CenterLoader,
  ErrorBoundary,
  GrayContainer,
  NotFoundPage,
} from '@pizza-app/ui-shared';
import * as React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AppShell from './components/AppShell/AppShell';
import { MantineProvider } from '@mantine/core';
import { useUserStore } from '@pizza-app/redux-store';
import { theme } from '@pizza-app/ui-shared';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Promos from './components/Promos/Promos';
import Orders from './components/Orders/Orders';
import OrderDetails from './components/Orders/OrderDetails';
import ManageProduct from './components/Products/CreateProduct/ManageProduct';
import Categories from './components/Categories/Categories';
import Auth from './components/Auth/Auth';
import { checkAuth } from './utils/api';
import ProtectedRoute from './components/ProtoctedRoute';

export function App() {
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
      <React.Suspense fallback={<CenterLoader />}>
        <GrayContainer>
          <AppShell>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/signin"
                element={
                  <ErrorBoundary>
                    <Auth />
                  </ErrorBoundary>
                }
              />
              <Route
                path="/user/changePassword"
                element={
                  <ErrorBoundary>
                    <Auth />
                  </ErrorBoundary>
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
                path="/products"
                element={
                  <ProtectedRoute>
                    <Products />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/products/create"
                element={
                  <ProtectedRoute>
                    <ManageProduct />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/products/edit"
                element={
                  <ProtectedRoute>
                    <ManageProduct />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/categories"
                element={
                  <ProtectedRoute>
                    <Categories />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/promos"
                element={
                  <ProtectedRoute>
                    <Promos />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AppShell>
        </GrayContainer>
      </React.Suspense>
      <Footer />
    </MantineProvider>
  );
}

export default App;
