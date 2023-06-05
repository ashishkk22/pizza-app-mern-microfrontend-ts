import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavigationManager } from '../components/NavigationManager';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import ChangePassword from '../components/ChangePassword';

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
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'signin',
        element: <SignIn />,
      },
      {
        path: 'changePassword',
        element: <ChangePassword />,
      },
    ],
  },
];
