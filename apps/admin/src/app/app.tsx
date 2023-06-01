import { CenterLoader, GrayContainer } from '@pizza-app/ui-shared';
import * as React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import AppShell from './components/AppShell/AppShell';
import { MantineProvider } from '@mantine/core';
import { StoreProvider } from '@pizza-app/redux-store';
import { theme } from '@pizza-app/ui-shared';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Promos from './components/Promos/Promos';
import Orders from './components/Orders/Orders';
import OrderDetails from './components/Orders/OrderDetails';
import ManageProduct from './components/Products/CreateProduct/ManageProduct';
import Categories from './components/Categories/Categories';

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
                <Route path="/orders" element={<Orders />} />
                <Route path="/orders/:orderId" element={<OrderDetails />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/create" element={<ManageProduct />} />
                {/* we are going to pass the data with navigate to update the product or delete it */}
                <Route path="/products/edit" element={<ManageProduct />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/promos" element={<Promos />} />
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
