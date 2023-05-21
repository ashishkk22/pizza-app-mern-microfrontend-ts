import React from 'react';
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  SegmentedControl,
} from '@mantine/core';

const DrinkCard = () => {
  return (
    <Card shadow="sm" padding="lg" radius="md" w={280}>
      <Card.Section component="a" href="#">
        <Image
          src="https://ik.imagekit.io/ashishkk22/juice-orange.svg"
          height={160}
          alt="margherita pizza"
        />
      </Card.Section>

      <Text my={10} color="brand.9" weight={600}>
        Margherita Pizza
      </Text>

      <Text size="sm" color="dimmed">
        Juicy chicken fillet and crispy bacon combined with signature tomato
        sauce, Mozzarella and onions
      </Text>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}> ₹ 500</Text>
        <Button color="red.6" radius="lg">
          Add to cart
        </Button>
      </Group>
    </Card>
  );
};

export default DrinkCard;
