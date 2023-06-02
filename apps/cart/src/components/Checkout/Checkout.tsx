import React, { useRef, useState } from 'react';
import { Button, Container, Flex, Title } from '@mantine/core';
import AddressSection from './Address/AddressSection';
import PaymentTypeSection from './PaymentType/PaymentTypeSection';
import PaymentSummary from './PaymentSummary/PaymentSummary';
import CouponSection from './Coupon/CouponSection';
import { AddressType } from '../../utils/Endpoints.type';

const Checkout = () => {
  const [currentAddress, setCurrentAddress] = useState<AddressType>({
    _id: '',
    address: '',
    name: '',
  });
  const [currentPayment, setCurrentPayment] = useState('COD');

  return (
    <Container pb={120}>
      <Title color="brand.9" order={3} py={24}>
        Checkout
      </Title>
      <AddressSection
        activeAddress={(data: AddressType) => setCurrentAddress(data)}
      />
      <PaymentTypeSection activeType={setCurrentPayment} />
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
