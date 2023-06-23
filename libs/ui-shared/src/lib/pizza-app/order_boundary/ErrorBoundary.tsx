import React, { ReactNode } from 'react';
import ErrorPage from './ErrorPage';
import { CenterLoader } from '../loader/CenterLoader';

type ErrorBoundaryProps = {
  children: ReactNode;
};
type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <React.Suspense fallback={<CenterLoader />}>
          <ErrorPage />
        </React.Suspense>
      );
    }
    return (
      <React.Suspense fallback={<CenterLoader />}>
        {this.props.children}
      </React.Suspense>
    );
  }
}
