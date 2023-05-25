import React from 'react';
import { Outlet } from 'react-router-dom';
// import { NavigationManager } from '../components/NavigationManager';
import Cart from '../components/Cart/Cart';
import { NavigationManager } from '../components/NavigationManager';
import Checkout from '../components/Checkout/Checkout';

export const routes = [
  {
    path: '/',
    element: (
      <NavigationManager>
        <Outlet />
      </NavigationManager>
    ),
    children: [
      {
        index: true,
        element: <Cart />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
    ],
  },
];
