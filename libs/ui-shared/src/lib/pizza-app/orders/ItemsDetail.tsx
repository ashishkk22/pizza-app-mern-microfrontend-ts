import React, { FC } from 'react';
import { Card, Divider, Flex, Group, Image, Text } from '@mantine/core';

type Item = {
  _id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  qty?: number | null | undefined;
};

type ItemDetailProps = {
  orders: Item[];
  orderId: string;
};

export const ItemsDetail: FC<ItemDetailProps> = ({ orders, orderId }) => {
  return (
    <Card shadow="sm" radius="md" w={'100%'} my={6}>
      <Flex gap={6} align="center" mb={12}>
        <Text fz="lg" fw={600}>
          Order Details
        </Text>
        <Text color="dimmed" fw={500}>
          #{orderId}
        </Text>
      </Flex>
      {orders?.map((item, index) => {
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
                <Flex justify="center" align="center" w={70} h={70}>
                  <Image src={item.image} alt={item.name} />
                </Flex>
                <Text color="brand.9" fw={600} mb={7} fz="md">
                  {item.name}
                </Text>
              </Group>
              <Group>
                <Text color="brand.9" weight={600}>
                  {item?.qty} items
                </Text>
              </Group>
            </Flex>
          </React.Fragment>
        );
      })}
    </Card>
  );
};
