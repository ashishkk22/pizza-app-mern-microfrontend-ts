import {
  Badge,
  Box,
  Card,
  Flex,
  Image,
  Loader,
  Pagination,
  ScrollArea,
  Table,
  Text,
} from '@mantine/core';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderStatus } from '../../utils/Endpoints.type';
import { useQuery } from '@tanstack/react-query';
import { getOrders } from '../../utils/api';

export const getBadgeColor = (status: OrderStatus) => {
  switch (status) {
    case 'received':
      return 'red.6';
    case 'prepared':
      return 'blue';
    case 'out_for_delivery':
      return 'green';
    case 'completed':
      return 'red.6';
    default:
      return 'red.6';
  }
};

const ths = (
  <tr>
    <th>Order Id</th>
    <th>Address</th>
    <th>Order status</th>
    <th>Order amount</th>
    <th>Placed time</th>
  </tr>
);

const Orders = () => {
  //to set and update the page in table
  const [page, setPage] = useState(1);

  const { data: orders, isLoading } = useQuery(
    ['orders', page],
    () => getOrders(page),
    {
      keepPreviousData: true,
      staleTime: 1 * 1000 * 1000,
    }
  );

  const navigate = useNavigate();
  const rows = orders?.data?.orders?.map((order) => {
    const badgeColor = getBadgeColor(order?.status as OrderStatus);
    const orderPrice = order.discountedPrice ?? order.totalPrice;
    return (
      <tr
        key={order._id}
        onClick={() => navigate(`/orders/${order._id}`, { state: order })}
        style={{ cursor: 'pointer' }}
      >
        <td>
          <Text fw={600}>{order._id}</Text>
        </td>
        <td>{order.address.address}</td>
        <td>
          <Badge color={badgeColor}>{order.status}</Badge>
        </td>
        <td>
          <Text fw={600}>₹{orderPrice}</Text>
        </td>
        <td>{order.createdAt.substring(0, 10)}</td>
      </tr>
    );
  });

  const TableData = () => {
    return (
      <>
        {' '}
        {rows && rows.length >= 1 ? (
          <>
            <Table
              horizontalSpacing="lg"
              verticalSpacing="md"
              mt={20}
              fontSize="sm"
            >
              <thead>{ths}</thead>
              <tbody style={{ border: 0 }}>{rows}</tbody>
            </Table>
            {orders?.data?.totalPages && (
              <Flex justify="flex-end" my={20}>
                <Pagination
                  total={orders?.data.totalPages}
                  size="md"
                  mt={'lg'}
                  value={page}
                  onChange={(page) => setPage(page)}
                  siblings={1}
                />
              </Flex>
            )}
          </>
        ) : (
          <Text>No data found !</Text>
        )}
      </>
    );
  };
  return (
    <Box p={10}>
      <Card shadow="sm" padding="lg" radius="md" m={8}>
        <Flex gap={10} align="center" wrap="wrap">
          <Image
            src="https://ik.imagekit.io/ashishkk22/pizza/recent_orders.svg"
            width={34}
          />
          <Text fz="md">Orders</Text>
        </Flex>
      </Card>
      <Card shadow="sm" padding="lg" radius="md" m={8}>
        <ScrollArea w={'100%'}>
          {isLoading ? (
            <Flex w={'100%'} justify="center">
              <Loader />
            </Flex>
          ) : (
            <TableData />
          )}
        </ScrollArea>
      </Card>
    </Box>
  );
};

export default Orders;
