import { Button, Container, Flex } from '@mantine/core';
import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Comment, CustomerDetail, ItemsDetail } from '@pizza-app/ui-shared';
import TimeLine from './TimeLine';
import { OrderedItems } from '../../utils/endPoint.type';

const OrderDetails = () => {
  const navigate = useNavigate();

  //getting data if sended from the previous page
  const { state } = useLocation();
  const orderData = state as OrderedItems;

  if (!orderData?._id) return <Navigate to="/orders" />;

  return (
    <Container pt={4}>
      <ItemsDetail orders={orderData.items} orderId={orderData._id} />
      <TimeLine status={orderData.status} orderId={orderData._id} />
      <CustomerDetail
        name={orderData.address.name}
        address={orderData.address.address}
        paymentType={orderData.paymentType}
        total={orderData.totalPrice}
      />
      {orderData.comment && <Comment msg={orderData?.comment} />}
      <Flex justify="flex-end">
        <Button onClick={() => navigate(-1)} my={4}>
          Back
        </Button>
      </Flex>
    </Container>
  );
};

export default OrderDetails;
