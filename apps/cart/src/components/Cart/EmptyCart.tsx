import { Center, Container, Image, Text } from '@mantine/core';
import React from 'react';

const EmptyCart = () => {
  return (
    <Container>
      <Center>
        <Image
          src="https://ik.imagekit.io/ashishkk22/pizza/empty_cart.svg?updatedAt=1685452384949"
          maw={500}
          m={80}
        />
      </Center>
      <Text color="brand.9" fw={600} fz="lg" align="center" m={16}>
        Cart is empty.
      </Text>
    </Container>
  );
};

export default EmptyCart;
