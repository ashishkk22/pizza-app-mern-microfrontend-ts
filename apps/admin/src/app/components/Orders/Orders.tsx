import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Image,
  Input,
  Loader,
  Pagination,
  ScrollArea,
  Table,
  Text,
} from '@mantine/core';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderStatus } from '../../utils/endPoint.type';
import { useQuery } from '@tanstack/react-query';
import { getOrders } from '../../utils/api';
import { getBadgeColor } from '../../utils/getBadgeColor';
import { IconSearch } from '@tabler/icons-react';

const ths = (
  <tr>
    <th>Name</th>
    <th>Order Id</th>
    <th>Address</th>
    <th>Order status</th>
    <th>Order amount</th>
    <th>Placed Date</th>
  </tr>
);

const Orders = () => {
  const [search, setSearch] = useState('');

  //to set and update the page in table
  const [page, setPage] = useState(1);

  const { data: orders, isLoading } = useQuery(
    ['orders', page],
    () => getOrders(page, 10),
    {
      keepPreviousData: true,
      staleTime: 1 * 1000 * 1000,
    }
  );

  const navigate = useNavigate();

  const filteredData = orders?.data.orders.filter((order) => {
    return order.address.name.toLowerCase().includes(search.toLowerCase());
  });

  const rows = filteredData?.map((order) => {
    const badgeColor = getBadgeColor(order?.status as OrderStatus);
    const orderPrice = order.discountedPrice ?? order.totalPrice;
    return (
      <tr
        key={order._id}
        onClick={() => navigate(`/orders/${order._id}`, { state: order })}
        style={{ cursor: 'pointer' }}
      >
        <td>
          <Text fw={600}>{order.address.name}</Text>
        </td>
        <td>
          <Text>{order._id}</Text>
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
        <Flex align="center" gap={16} justify="space-between">
          <Flex gap={10} justify="center" align="center" wrap="wrap">
            <Image
              src="https://ik.imagekit.io/ashishkk22/pizza/recent_orders.svg"
              width={34}
            />
            <Text fz="md">Orders</Text>
          </Flex>
          <Flex gap={10} justify="center" align="center" wrap="wrap">
            <Input
              icon={<IconSearch />}
              placeholder="Search orders by name ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button onClick={() => setSearch('')}>Reset</Button>
          </Flex>
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
