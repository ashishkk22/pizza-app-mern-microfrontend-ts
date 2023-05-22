import React from 'react';
import { Button, Center, Container, Flex, Title } from '@mantine/core';
import PizzaCard from './PizzaCard';

const PizzaSection = () => {
  return (
    <Container py={16}>
      <Flex
        gap="md"
        align="center"
        direction="row"
        wrap="wrap"
        justify="center"
      >
        <PizzaCard />
        <PizzaCard />
        <PizzaCard />
        <PizzaCard />
        <PizzaCard />
        <PizzaCard />
        <PizzaCard />
      </Flex>
    </Container>
  );
};

export default PizzaSection;
