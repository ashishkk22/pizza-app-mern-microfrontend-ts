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

const PizzaCard = () => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      w={280}
      style={{ alignSelf: 'flex-start' }}
    >
      <Card.Section component="a" href="#">
        <Image
          src="https://ik.imagekit.io/ashishkk22/Margherita-pizza.svg?updatedAt=1684693393350"
          height={160}
          alt="margherita pizza"
        />
      </Card.Section>

      <Text my={10} color="brand.9" weight={600}>
        Margherita Pizza
      </Text>

      <Text size="sm" color="dimmed">
        Juicy watermelon and combined with signature tomato sauce, Mozzarella
        and onions
      </Text>
      <SegmentedControl
        fullWidth
        data={['L', 'M', 'S']}
        radius={16}
        my={8}
        color="gray.5"
      />
      <SegmentedControl
        fullWidth
        radius={16}
        data={['Thick', 'Thin']}
        my={8}
        color="gray.5"
      />
      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}> ₹ 500</Text>
        <Button color="red.6" radius="lg">
          Add to cart
        </Button>
      </Group>
    </Card>
  );
};

export default PizzaCard;
