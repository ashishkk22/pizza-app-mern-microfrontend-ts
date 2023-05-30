import React from 'react';
import PopularOrder from './components/PopularOrder';
import Category from './components/Category';
import { Box } from '@mantine/core';
const App = () => {
  return (
    <Box bg="#F5F5F5">
      <PopularOrder />
      <Category />
    </Box>
  );
};

export default App;
