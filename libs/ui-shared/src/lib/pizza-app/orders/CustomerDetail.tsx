import { Card, Divider, Flex, Text } from '@mantine/core';
import React, { FC } from 'react';

type CustomerDetailProps = {
  name: string;
  address: string;
  paymentType: string;
  total: number;
};

export const CustomerDetail: FC<CustomerDetailProps> = ({
  address,
  name,
  paymentType,
  total,
}) => {
  return (
    <Card shadow="sm" radius="md" w={'100%'} my={6}>
      <Text fz="lg" fw={600} mb={12}>
        Customer Details
      </Text>
      <Divider size="xs" color="gray.2" my={16} />
      <Flex direction="column" my={20}>
        <Text color="gray.6" fw={500}>
          Name
        </Text>
        <Text fw={600}>{name}</Text>
      </Flex>
      <Flex direction="column" my={20}>
        <Text color="gray.6" fw={500}>
          Address
        </Text>
        <Text fw={500}>{address}</Text>
      </Flex>
      <Flex direction="column" my={20}>
        <Text color="gray.6" fw={500}>
          Payment type
        </Text>
        <Text fw={600}>{paymentType}</Text>
      </Flex>
      <Flex direction="column" my={20}>
        <Text color="gray.6" fw={500}>
          Order amount
        </Text>
        <Text fw={600}>₹ {total}</Text>
      </Flex>
    </Card>
  );
};
