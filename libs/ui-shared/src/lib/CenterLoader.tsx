import { Flex, Loader } from '@mantine/core';
// import React from 'react';

export const CenterLoader = () => {
  return (
    <Flex h={'100vh'} justify="center" align="center">
      <Loader />
    </Flex>
  );
};

// export  CenterLoader;
