import React, { useRef } from 'react';
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Loader,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import AddressSection from './Address/AddressSection';
import PaymentTypeSection from './PaymentType/PaymentTypeSection';
import RestaurantSection from './Restaurant/RestaurantSection';
import PaymentSummary from './PaymentSummary/PaymentSummary';
import CouponSection from './Coupon/CouponSection';

const initialValues = { userAdd: null, resAdd: null, paymentType: null };

const Checkout = () => {
  const checkoutDetail = useRef<{
    userAdd: null | number;
    resAdd: null | number;
    paymentType: null | string;
  }>(initialValues);

  const SetUserAddress = (id: number) => {
    checkoutDetail.current.userAdd = id;
  };

  const SetRestaurantAddress = (id: number) => {
    checkoutDetail.current.resAdd = id;
  };

  const SetPaymentType = (type: string) => {
    checkoutDetail.current.paymentType = type;
  };

  return (
    <Container pb={120}>
      <Title color="brand.9" order={3} py={24}>
        Checkout
      </Title>
      <AddressSection activeAddress={SetUserAddress} />
      <RestaurantSection activeAddress={SetRestaurantAddress} />
      <PaymentTypeSection activeType={SetPaymentType} />
      <CouponSection />
      <PaymentSummary />
      <Flex justify="flex-end">
        <Button size="md" my={20}>
          Checkout
        </Button>
      </Flex>
    </Container>
  );
};

export default Checkout;
