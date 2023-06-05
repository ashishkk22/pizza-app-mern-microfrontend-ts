import { Card, Divider, Flex, Text } from '@mantine/core';
import { useCartStore } from '@pizza-app/redux-store';
import React from 'react';

const PaymentSummary = () => {
  const ActiveDiscount = true;

  const { discount, totalPrice, discountedPrice } = useCartStore();
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
            ₹{totalPrice}
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
                ₹{discount}
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
            ₹{discountedPrice === 0 ? totalPrice : discountedPrice}
          </Text>
        </Flex>
      </Card>
    </>
  );
};

export default PaymentSummary;
