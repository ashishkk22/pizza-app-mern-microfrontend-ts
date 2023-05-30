import React, { FC } from 'react';
import { Card, Image, Text, Button, Group } from '@mantine/core';

type DrinkCardProps = {
  image: string;
  name: string;
  description: string;
  price: number;
  onClick: () => void;
};

const DrinkCard: FC<DrinkCardProps> = ({
  image,
  name,
  description,
  price,
  onClick,
}) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" w={280}>
      <Card.Section component="a" href="#">
        <Image src={image} height={160} alt="margherita pizza" />
      </Card.Section>
      <Text my={10} color="brand.9" weight={600}>
        {name}
      </Text>
      <Text size="sm" color="dimmed">
        {description}
      </Text>
      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}> ₹ {price}</Text>
        <Button color="red.6" radius="lg" onClick={onClick}>
          Add to cart
        </Button>
      </Group>
    </Card>
  );
};

export default DrinkCard;
