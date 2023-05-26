import { Button, Flex, Loader, Text, TextInput } from '@mantine/core';
import React from 'react';

const CouponSection = () => {
  return (
    <>
      <Text my={20}>Coupon</Text>
      <Flex my={20}>
        <TextInput
          w={'100%'}
          size="md"
          placeholder="Coupon code"
          rightSection={<Loader size="xs" />}
        />
        <Button ml={12} size="md">
          APPLY
        </Button>
      </Flex>
    </>
  );
};

export default CouponSection;
