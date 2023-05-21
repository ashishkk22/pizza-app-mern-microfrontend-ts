import React from 'react';
import { Button, Container, Flex, Title } from '@mantine/core';
import PizzaCard from './PizzaCard';

const PizzaSection = () => {
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
