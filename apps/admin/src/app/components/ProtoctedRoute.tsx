import { useUserStore } from '@pizza-app/redux-store';
import { ErrorBoundary } from '@pizza-app/ui-shared';
import React, { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuth } = useUserStore();
  return isAuth ? (
    <ErrorBoundary>{children}</ErrorBoundary>
  ) : (
    <Navigate to="/user/signin" />
  );
};

export default ProtectedRoute;
