import {
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Loader,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import React from 'react';

const PaymentSummary = () => {
  const ActiveDiscount = true;
  // const;
  return (
    <>
      <Text my={20}>Payment Summary </Text>
      <Card>
        <Flex direction="row" justify="space-between" my={10}>
          <Text fw={400} color="brand.9">
            SubTotal
          </Text>
          <Text fw={600} color="brand.9">
            ₹4000
          </Text>
        </Flex>
        <Divider size="xs" color="gray.2" my={16} />
        <Flex direction="row" justify="space-between">
          <Text fw={400} color="brand.9">
            Taxes
          </Text>
          <Text fw={600} color="brand.9">
            ₹4000
          </Text>
        </Flex>
        <Divider size="xs" color="gray.2" my={16} />
        <Flex direction="row" justify="space-between">
          <Text fw={400} color="brand.9">
            Delivery Services
          </Text>
          <Text fw={600} color="brand.9">
            ₹4000
          </Text>
        </Flex>
        <Divider size="xs" color="gray.2" my={16} />
        {ActiveDiscount && (
          <>
            <Flex direction="row" justify="space-between">
              <Text fw={400} color="brand.9">
                Discount
              </Text>
              <Text fw={600} color="brand.9">
                ₹400
              </Text>
            </Flex>
            <Divider size="xs" color="gray.2" my={16} />
          </>
        )}
        <Flex direction="row" justify="space-between">
          <Text fw={700} color="brand.9">
            Order Total
          </Text>
          <Text fw={700} color="brand.9">
            ₹1000
          </Text>
        </Flex>
      </Card>
    </>
  );
};

export default PaymentSummary;
