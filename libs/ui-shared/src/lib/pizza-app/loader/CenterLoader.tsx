import { Flex, Loader } from '@mantine/core';

export const CenterLoader = () => {
  return (
    <Flex h={'100vh'} justify="center" align="center">
      <Loader />
    </Flex>
  );
};
