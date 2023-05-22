import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavigationManager } from '../components/NavigationManager';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

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
        element: <SignUp />,
      },
      {
        // index: true,
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'signin',
        element: <SignIn />,
      },
    ],
  },
];
