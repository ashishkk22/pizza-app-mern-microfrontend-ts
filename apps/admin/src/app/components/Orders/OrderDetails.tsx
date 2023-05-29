import { Button, Container, Flex } from '@mantine/core';
import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CustomerDetail from './CustomerDetail';
import Comment from './Comment';
import TimeLine from './TimeLine';
import ItemsDetail from './ItemsDetail';

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  return (
    <Container>
      <ItemsDetail orderId={orderId} />
      <TimeLine />
      <CustomerDetail />
      <Comment />
      <Flex justify="flex-end">
        <Button onClick={() => navigate(-1)} my={4}>
          Back
        </Button>
      </Flex>
    </Container>
  );
};

export default OrderDetails;
