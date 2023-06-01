import React, { useRef, useState } from 'react';
import { Button, Container, Flex, Title } from '@mantine/core';
import AddressSection from './Address/AddressSection';
import PaymentTypeSection from './PaymentType/PaymentTypeSection';
import PaymentSummary from './PaymentSummary/PaymentSummary';
import CouponSection from './Coupon/CouponSection';
import { AddressType } from '../../utils/Endpoints.type';

const initialValues = { userAdd: null, resAdd: null, paymentType: null };

const Checkout = () => {
  const checkoutDetail = useRef<{
    userAdd: null | number;
    resAdd: null | number;
    paymentType: null | string;
  }>(initialValues);

  const [currentAddress, setCurrentAddress] = useState<AddressType>({
    _id: '',
    address: '',
    name: '',
  });
  const [currentPayment, setCurrentPayment] = useState('');

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
