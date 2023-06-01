import { Button, Center, Container, Flex, Title } from '@mantine/core';
import React from 'react';
import PopularCard from './CategorySections/PopularCard';

const PopularOrder = () => {
  return (
    <Container>
      <Title color="brand.9" order={3} py={20}>
        Popular Orders
      </Title>

      <Flex
        gap="md"
        style={{ flexFlow: 'row wrap' }}
        align="center"
        justify={'center'}
        direction="row"
        wrap="wrap"
      >
        <PopularCard
          imgUrl="https://ik.imagekit.io/ashishkk22/peperoni-p1.svg?updatedAt=1684684047494"
          price={299}
        />
        <PopularCard
          imgUrl="https://ik.imagekit.io/ashishkk22/Four-cheese.svg?updatedAt=1684685021492"
          price={399}
        />
        <PopularCard
          imgUrl="https://ik.imagekit.io/ashishkk22/peperoni-p1.svg?updatedAt=1684684047494"
          price={499}
        />
      </Flex>
    </Container>
  );
};

export default PopularOrder;
