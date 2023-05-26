import { Box, Button, Container, Flex, Text, Title } from '@mantine/core';
import React from 'react';
import ShoppingCard from './ShoppingCard';
import { Link } from 'react-router-dom';

const PopularOrder = () => {
  return (
    <Container py={40}>
      <Title color="brand.9" order={3} py={24}>
        Shopping Cart
      </Title>
      <ShoppingCard />
      <ShoppingCard />
      <ShoppingCard />
      <ShoppingCard />
      <Flex justify="space-between" align="center" direction="row" w={'100%'}>
        <Text color="brand.9" weight={600} fz="lg">
          Subtotal
        </Text>
        <Text color="brand.9" weight={600} fz="lg">
          ₹3299
        </Text>
      </Flex>
      <Flex justify="flex-end" my={10}>
        <Link to="/checkout">
          <Button mt={22} size="md">
            Order now
          </Button>
        </Link>
      </Flex>
    </Container>
  );
};

export default PopularOrder;
