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
import { getBadgeColor, getOrderStatus } from '../../utils/getOrderStatus';
import { Link, useNavigate } from 'react-router-dom';

const elements = [
  {
    id: 'sdkflewwewfdsf',
    name: 'Ashish Kachhadiya',
    address:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident dolorum necessitatibus corporis?',
    price: 1200,
    status: 0,
  },
  {
    id: 'sdkflewwewfasdsf',
    name: 'Mayank',
    address:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident',
    price: 900,
    status: 1,
  },
  {
    id: 'sdkfasqwlewwewfdsf',
    name: 'vishal',
    address: 88.906,
    price: 1900,
    status: 2,
  },
  {
    id: 'sdkaeqwflewwewfdsf',
    name: 'harsh vadadoriya',
    address:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident ',
    price: 1920,
    status: 2,
  },
  {
    id: 'sdkflawqsfewwewfdsf',
    name: 'vipul',
    address:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident dolorum necessitatibus corporis?',
    price: 2200,
    status: 1,
  },
];

const Home = () => {
  const navigate = useNavigate();

  const rows = elements.map((element) => {
    const orderStatus = getOrderStatus(element.status);
    const badgeColor = getBadgeColor(element.status);
    return (
      <tr
        key={element.name + element.price}
        onClick={() => navigate(`/orders/${element.id}`)}
        style={{ cursor: 'pointer' }}
      >
        <td style={{ border: 0 }}>
          <Flex direction="column">
            <Text fw={600}>{element.name}</Text>
            <Text>{element.address}</Text>
          </Flex>
        </td>
        <td style={{ border: 0 }}>
          <Text fw={600}>₹{element.price}</Text>
        </td>
        <td style={{ border: 0 }}>
          <Badge color={badgeColor}>{orderStatus}</Badge>
        </td>
      </tr>
    );
  });
  return (
    <Container pb={120}>
      <Title order={2} m={8}>
        Hello Welcome back, Ashish
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
                ₹ 522,000
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
