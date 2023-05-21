import React from 'react';
import DrinkCard from '../drink/DrinkCard';
import { Container, Flex } from '@mantine/core';

const SouceSection = () => {
  console.log('souce section');
  return (
    <Container py={16}>
      <Flex
        // mih={50}
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
