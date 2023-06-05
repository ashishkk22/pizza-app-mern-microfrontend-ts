import { useUserStore } from '@pizza-app/redux-store';
import React, { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuth } = useUserStore();
  return isAuth ? <>{children}</> : <Navigate to="/user/signin" />;
};

export default ProtectedRoute;
