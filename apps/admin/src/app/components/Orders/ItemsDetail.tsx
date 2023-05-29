import React, { FC } from 'react';
import { Box, Card, Divider, Flex, Group, Image, Text } from '@mantine/core';

const orderDetails = [
  {
    name: 'Pepperoni Pizza',
    qty: 2,
    size: 'large',
    image:
      'https://ik.imagekit.io/ashishkk22/pizza-banner.svg?updatedAt=1684733181767',
  },
  {
    name: 'Juice Orange',
    qty: 2,
    image:
      'https://ik.imagekit.io/ashishkk22/juice-orange.svg?updatedAt=1684695220145',
  },
  {
    name: 'Margherita Pizza',
    qty: 2,
    size: 'small',
    image:
      'https://ik.imagekit.io/ashishkk22/Margherita-pizza.svg?updatedAt=1684693393350',
  },
];

type ItemDetailProps = {
  orderId: string | undefined;
};

const ItemsDetail: FC<ItemDetailProps> = ({ orderId = '' }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" m={8} w={'100%'}>
      <Flex gap={6} align="center" mb={12}>
        <Text fz="lg" fw={600}>
          Order Details
        </Text>
        <Text color="dimmed" fw={500}>
          #{orderId}
        </Text>
      </Flex>
      {orderDetails.map((item, index) => {
        return (
          <React.Fragment key={item.name + index}>
            <Divider size="xs" color="gray.2" my={16} />
            <Flex
              justify="space-between"
              align="center"
              direction="row"
              w={'100%'}
            >
              <Group align="center">
                <Box w={60} h={60} my={5}>
                  <Image src={item.image} alt={item.name} />
                </Box>
                <Box>
                  <Text color="brand.9" fw={600} mb={7} fz="md">
                    {item.name}
                  </Text>
                  {item.size && (
                    <Text fz="xs" my={7} color="brand.9" fw={500}>
                      {item.size}
                    </Text>
                  )}
                </Box>
              </Group>
              <Group>
                <Text color="brand.9" weight={600}>
                  {item.qty} items
                </Text>
              </Group>
            </Flex>
          </React.Fragment>
        );
      })}
    </Card>
  );
};

export default ItemsDetail;
