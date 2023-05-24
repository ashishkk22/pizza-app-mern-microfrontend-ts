import React from 'react';
import { Outlet } from 'react-router-dom';
// import { NavigationManager } from '../components/NavigationManager';
import Cart from '../components/Cart';
import { NavigationManager } from '../components/NavigationManager';

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
      // {
      //   // index: true,
      //   path: 'signup',
      //   element: <SignUp />,
      // },
      // {
      //   path: 'signin',
      //   element: <SignIn />,
      // },
    ],
  },
];
