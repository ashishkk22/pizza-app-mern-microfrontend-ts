import React from 'react';
import Banner from '../banner/Banner';
import { CenterLoader, ErrorBoundary } from '@pizza-app/ui-shared';
const Shop = React.lazy(() => import('shop/Module'));
const Home = () => {
  return (
    <React.Suspense fallback={<CenterLoader />}>
      <Banner />
      <ErrorBoundary>
        <Shop />
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default Home;
