import { Card, Divider, Flex, Text } from '@mantine/core';
import React from 'react';

const CustomerDetail = () => {
  return (
    <Card shadow="sm" padding="lg" radius="md" m={8} w={'100%'}>
      <Text fz="lg" fw={600} mb={12}>
        Customer Details
      </Text>
      <Divider size="xs" color="gray.2" my={16} />
      <Flex direction="column" my={20}>
        <Text color="gray.6" fw={500}>
          Name
        </Text>
        <Text fw={600}>Ashish Kachhadiya</Text>
      </Flex>
      <Flex direction="column" my={20}>
        <Text color="gray.6" fw={500}>
          Address
        </Text>
        <Text fw={500}>Near Sarthak school nikol ahmedabad, 38230</Text>
      </Flex>
      <Flex direction="column" my={20}>
        <Text color="gray.6" fw={500}>
          Payment type
        </Text>
        <Text fw={600}>Cash on delivery</Text>
      </Flex>
      <Flex direction="column" my={20}>
        <Text color="gray.6" fw={500}>
          Order amount
        </Text>
        <Text fw={600}>₹ 1250</Text>
      </Flex>
    </Card>
  );
};

export default CustomerDetail;
