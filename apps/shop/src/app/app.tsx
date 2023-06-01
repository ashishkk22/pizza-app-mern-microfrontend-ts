import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { Box } from '@mantine/core';
import PopularOrder from './components/PopularOrder';
import Category from './components/CategorySections/Category';
import queryClient from './utils/queryClient';
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Box bg="#F5F5F5">
        <PopularOrder />
        <Category />
      </Box>
    </QueryClientProvider>
  );
};

export default App;
