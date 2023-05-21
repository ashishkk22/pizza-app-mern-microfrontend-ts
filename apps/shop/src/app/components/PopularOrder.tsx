import { Button, Container, Flex, Title } from '@mantine/core';
import React from 'react';
import PopularCard from './PopularCard';

const PopularOrder = () => {
  return (
    <Container>
      <Title color="brand.9" order={3} py={20}>
        Popular Orders
      </Title>
      <Flex
        // mih={50}
        gap="md"
        justify="center"
        align="center"
        direction="row"
        wrap="wrap"
      >
        {/* <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button> */}
        <PopularCard imgUrl="https://ik.imagekit.io/ashishkk22/Four-cheese.svg?updatedAt=1684685021492" />
        <PopularCard imgUrl="https://ik.imagekit.io/ashishkk22/peperoni-p1.svg?updatedAt=1684684047494" />
        <PopularCard imgUrl="https://ik.imagekit.io/ashishkk22/Four-cheese.svg?updatedAt=1684685021492" />
      </Flex>
    </Container>
  );
};

export default PopularOrder;
