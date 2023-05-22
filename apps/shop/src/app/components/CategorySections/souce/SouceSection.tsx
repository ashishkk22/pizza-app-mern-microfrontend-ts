import React from 'react';
import DrinkCard from '../drink/DrinkCard';
import { Container, Flex } from '@mantine/core';

const SouceSection = () => {
  return (
    <Container py={16}>
      <Flex
        gap="md"
        justify="center"
        align="center"
        direction="row"
        wrap="wrap"
      >
        <DrinkCard />
        <DrinkCard />
        <DrinkCard />
        <DrinkCard />
        <DrinkCard />
        <DrinkCard />
        <DrinkCard />
        <DrinkCard />
      </Flex>
    </Container>
  );
};

export default SouceSection;
