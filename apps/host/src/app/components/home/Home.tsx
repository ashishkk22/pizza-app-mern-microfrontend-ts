import React from 'react';
import Banner from '../banner/Banner';
import { CenterLoader } from '@pizza-app/ui-shared';
const Shop = React.lazy(() => import('shop/Module'));
const Home = () => {
  return (
    <React.Suspense fallback={<CenterLoader />}>
      <Banner />
      <Shop />
    </React.Suspense>
  );
};

export default Home;
