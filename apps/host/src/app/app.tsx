import * as React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import {
  ColorScheme,
  MantineProvider,
  ColorSchemeProvider,
} from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
const Cart = React.lazy(() => import('cart/Module'));
const Shop = React.lazy(() => import('shop/Module'));
const Auth = React.lazy(() => import('auth/Module'));
const primaryColor = ['#ff5655'];
export function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withNormalizeCSS
        withGlobalStyles
        theme={{
          colorScheme,
          fontFamily: 'Open Sans',
          colors: {
            brand: [
              '#EDEDED',
              '#ff8988',
              '#ff9a99',
              '#ffbbbb',
              '#ffcccc',
              '#ffdddd',
              '#ff5655',
              '#ff6766',
              '#ffeeee',
              '#70544F',
            ],
          },
          primaryColor: 'brand',
        }}
      >
        <BrowserRouter>
          <React.Suspense fallback={null}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/shop" element={<></>} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </React.Suspense>
        </BrowserRouter>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
