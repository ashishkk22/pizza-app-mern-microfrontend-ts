import React, { useState } from 'react';
import { Button, Container, Flex, Text, Textarea, Title } from '@mantine/core';
import AddressSection from './Address/AddressSection';
import PaymentTypeSection from './PaymentType/PaymentTypeSection';
import PaymentSummary from './PaymentSummary/PaymentSummary';
import CouponSection from './Coupon/CouponSection';
import { AddressType, CreateOrderBody } from '../../utils/Endpoints.type';
import { useCartReducer, useCartStore } from '@pizza-app/redux-store';
import { Navigate, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { createOrder } from '../../utils/api';
import { toast } from 'react-hot-toast';
import { queryClient } from '@pizza-app/ui-shared';

const Checkout = () => {
  const { cartTotalQty, discount, items, totalPrice, discountedPrice } =
    useCartStore();
  const { resetCart } = useCartReducer();
  const navigate = useNavigate();

  const [currentAddress, setCurrentAddress] = useState<AddressType>({
    _id: '',
    address: '',
    name: '',
  });
  const [currentPayment, setCurrentPayment] = useState('COD');
  const [comment, setComment] = useState('');

  const orderMutation = useMutation({
    mutationFn: (body: CreateOrderBody) => createOrder(body),
    onError: () => toast.error('Order failed ! please fill all the values'),
    onSuccess: () => {
      resetCart();
      toast.success('Order created successfully !');
      navigate('/');
      queryClient.invalidateQueries(['orders']);
    },
  });

  const checkoutHandler = () => {
    const orderTotal = discountedPrice === 0 ? totalPrice : discountedPrice;
    if (!currentAddress?._id) {
      toast.error('Please provide the address !');
      return;
    }
    orderMutation.mutate({
      cartTotalQty,
      discount,
      items,
      totalPrice: orderTotal,
      address: currentAddress,
      paymentType: currentPayment,
      comment,
    });
  };

  if (cartTotalQty <= 0) return <Navigate to="/" />;
  return (
    <Container pb={120}>
      <Title color="brand.9" order={3} py={24}>
        Checkout
      </Title>
      <AddressSection
        activeAddress={(data: AddressType) => setCurrentAddress(data)}
      />
      <PaymentTypeSection activeType={setCurrentPayment} />
      <Text my={20}>Comment for Restaurant</Text>
      <Textarea
        placeholder="Enter the message for restaurant"
        autosize
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        minRows={2}
        maxRows={4}
        size="md"
      />
      <CouponSection />
      <PaymentSummary />
      <Flex justify="flex-end">
        <Button
          size="md"
          my={20}
          onClick={checkoutHandler}
          loading={orderMutation.isLoading}
        >
          Checkout
        </Button>
      </Flex>
    </Container>
  );
};

export default Checkout;
