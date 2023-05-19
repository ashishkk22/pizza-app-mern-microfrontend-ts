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
          // colors: {
          // ak: [
          //   '#FF6900',
          //   '#FF6900',
          //   '#FF6900',
          //   '#FF6900',
          //   '#FF6900',
          //   '#FF6900',
          //   '#ff5655',
          //   '#FF6900',
          //   '#FF6900',
          //   '#FF6900',
          // ],
          // },
          primaryColor: '#ff5655',
        }}
      >
        <BrowserRouter>
          <React.Suspense fallback={null}>
            <Navbar />
            <Routes>
              <Route path="/" element={<></>} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </React.Suspense>
        </BrowserRouter>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
