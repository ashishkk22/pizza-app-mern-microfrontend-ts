import { Box, Button, Card, Flex, Group, Image, Text } from '@mantine/core';
import React, { FC } from 'react';
type ProductCardProps = {
  image: string;
  name: string;
  description: string;
  price: number;
  onClick: () => void;
};
const ProductCard: FC<ProductCardProps> = ({
  image,
  name,
  description,
  price,
  onClick,
}) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" w={280} h={380}>
      <Flex justify="space-between" h={'100%'} direction="column">
        <Box>
          <Card.Section>
            <Image src={image} height={160} alt={name} />
          </Card.Section>
          <Text my={10} color="brand.9" weight={600}>
            {name}
          </Text>
          <Text size="sm" color="dimmed">
            {description}
          </Text>
        </Box>
        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}> ₹ {price}</Text>
          <Button color="red.6" radius="lg" onClick={onClick}>
            Add to cart
          </Button>
        </Group>
      </Flex>
    </Card>
  );
};

export default ProductCard;
