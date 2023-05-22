import React from 'react';
import { Button, Container, Flex, Title } from '@mantine/core';
import DrinkCard from './DrinkCard';

const DrinkSection = () => {
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

export default DrinkSection;
