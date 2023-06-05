import {
  Badge,
  Button,
  Card,
  Container,
  Flex,
  Image,
  ScrollArea,
  Table,
  Text,
  Title,
} from '@mantine/core';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '@pizza-app/redux-store';
import { useQuery } from '@tanstack/react-query';
import { getOrders } from '../../utils/api';
import { getBadgeColor } from '../../utils/getBadgeColor';
import { OrderStatus } from '../../utils/endPoint.type';

const Home = () => {
  const { name } = useUserStore();

  const navigate = useNavigate();

  const { data: orders } = useQuery(['home_orders'], () => getOrders(1, 10));

  const rows = orders?.data.orders.map((order) => {
    const badgeColor = getBadgeColor(order?.status as OrderStatus);
    const orderPrice = order.discountedPrice ?? order.totalPrice;
    return (
      <tr
        key={order._id}
        onClick={() => navigate(`/orders/${order._id}`)}
        style={{ cursor: 'pointer' }}
      >
        <td style={{ border: 0 }}>
          <Flex direction="column">
            <Text fw={600}>{order.address.name}</Text>
            <Text>{order.address.address}</Text>
          </Flex>
        </td>
        <td style={{ border: 0 }}>
          <Text fw={600}>₹{orderPrice}</Text>
        </td>
        <td style={{ border: 0 }}>
          <Badge color={badgeColor}>{order.status}</Badge>
        </td>
      </tr>
    );
  });
  return (
    <Container pb={120}>
      <Title order={2} m={8}>
        Hello Welcome back, {name}
        <span role="img" aria-label="happy emoji">
          😊
        </span>
      </Title>
      <Flex wrap="wrap" w="100%" my={8}>
        <Card shadow="sm" padding="lg" radius="md" m={12}>
          <Flex justify="space-between" align="center" gap={16}>
            <Image
              src="https://ik.imagekit.io/ashishkk22/pizza/total_order.svg"
              width={48}
            />
            <Flex direction="column">
              <Text>Total Orders</Text>
              <Text fz={'xl'} weight={500}>
                22
              </Text>
            </Flex>
          </Flex>
        </Card>
        <Card shadow="sm" padding="lg" radius="md" m={12}>
          <Flex justify="space-between" align="center" gap={16}>
            <Image
              src="https://ik.imagekit.io/ashishkk22/pizza/total_sale.svg"
              width={48}
            />
            <Flex direction="column">
              <Text>Total Sale</Text>
              <Text fz={'xl'} weight={500}>
                ₹ 18,329
              </Text>
            </Flex>
          </Flex>
        </Card>
      </Flex>
      <Card shadow="sm" padding="lg" radius="md" m={12}>
        <Flex align="center" gap={16}>
          <Image
            src="https://ik.imagekit.io/ashishkk22/pizza/recent_orders.svg"
            width={48}
          />
          <Text>Recent Orders</Text>
        </Flex>
        <ScrollArea w={'100%'}>
          <Table horizontalSpacing="lg" verticalSpacing="md" mt={20}>
            <tbody style={{ border: 0 }}>{rows}</tbody>
          </Table>
        </ScrollArea>
        <Button variant="subtle" compact m={8} component={Link} to="/orders">
          See all orders
        </Button>
      </Card>
    </Container>
  );
};

export default Home;
