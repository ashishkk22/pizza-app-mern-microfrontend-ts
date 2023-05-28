import {
  Box,
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

const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

const Home = () => {
  const ths = (
    <tr>
      <th>Element position</th>
      <th>Element name</th>
      <th>Symbol</th>
      <th>Atomic mass</th>
    </tr>
  );
  const rows = elements.map((element) => (
    <tr key={element.name}>
      <td>{element.position}</td>
      <td>{element.name}</td>
      <td>{element.symbol}</td>
      <td>{element.mass}</td>
    </tr>
  ));
  return (
    <Container pb={120}>
      <Title order={2}>
        Good Morning, Ashish
        <span role="img" aria-label="happy emoji">
          😊
        </span>
      </Title>
      <Flex wrap="wrap" w="100%">
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
        <ScrollArea>
          <Table horizontalSpacing="xl" verticalSpacing="sm" highlightOnHover>
            <thead>{ths}</thead>
            <tbody>{rows}</tbody>
          </Table>
        </ScrollArea>
        See all orders
      </Card>
    </Container>
  );
};

export default Home;
