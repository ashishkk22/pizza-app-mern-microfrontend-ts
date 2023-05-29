import {
  Badge,
  Card,
  Flex,
  Image,
  Input,
  Pagination,
  ScrollArea,
  Table,
  Text,
} from '@mantine/core';
import React, { useState } from 'react';
import { IconSearch } from '@tabler/icons-react';
import { getBadgeColor, getOrderStatus } from '../../utils/getOrderStatus';
import { useNavigate } from 'react-router-dom';

const elements = [
  {
    id: '34udfauw34udfw3',
    name: 'Ashish Kachhadiya',
    address:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident dolorum necessitatibus corporis?',
    price: 1200,
    status: 0,
    time: '25 July 2022 11:30 PM',
  },
  {
    id: '34udfauwas3asd4udfw3',
    name: 'Mayank',
    address:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident',
    price: 900,
    status: 1,
    time: '25 July 2022 11:30 PM',
  },
  {
    id: '34udfauwqq3asd4udfw3',
    name: 'vishal',
    address: 'lorem dsaer asdfwewe asdewr dswersdf ewrsdfewr sdgwee ase',
    price: 1900,
    status: 2,
  },
  {
    id: '34udfauw3qwerasd4udfw3',
    name: 'harsh vadadoriya',
    address:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident ',
    price: 1920,
    status: 2,
    time: '25 July 2022 11:30 PM',
  },
  {
    id: '34udfauw3qweasd4udfw3',
    name: 'vipul',
    address:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident dolorum necessitatibus corporis?',
    price: 2200,
    status: 1,
    time: '25 July 2022 11:30 PM',
  },
  {
    id: '34udfauw3qwasd4udfw3',
    name: 'Ashish Kachhadiya',
    address:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident dolorum necessitatibus corporis?',
    price: 1200,
    status: 0,
    time: '25 July 2022 11:30 PM',
  },
  {
    id: '34udfauw3ewqasd4udfw3',
    name: 'Mayank',
    address:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident',
    price: 900,
    status: 1,
    time: '25 July 2022 11:30 PM',
  },
  {
    id: '34udfauwase3asd4udfw3',
    name: 'vishal',
    address:
      "'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident'",
    price: 1900,
    status: 2,
  },
  {
    id: '34udfauwsa3asd4udfw3',
    name: 'harsh vadadoriya',
    address:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident ',
    price: 1920,
    status: 2,
    time: '25 July 2022 11:30 PM',
  },
  {
    id: '34udfauw3assdd4udfw3',
    name: 'vipul',
    address:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident dolorum necessitatibus corporis?',
    price: 2200,
    status: 1,
    time: '25 July 2022 11:30 PM',
  },
];

const Orders = () => {
  const [search, setSearch] = useState('');
  const ths = (
    <tr>
      <th>Customer name</th>
      <th>Address</th>
      <th>Order status</th>
      <th>Order amount</th>
      <th>Placed time</th>
    </tr>
  );
  const filteredData = elements.filter((order) => {
    return order.name.toLowerCase().includes(search.toLowerCase());
  });
  const navigate = useNavigate();
  const rows = filteredData.map((element, index) => {
    const orderStatus = getOrderStatus(element.status);
    const badgeColor = getBadgeColor(element.status);
    return (
      <tr
        key={element.name + element.price + index}
        onClick={() => navigate(`/orders/${element.id}`)}
        style={{ cursor: 'pointer' }}
      >
        <td>
          <Text fw={600}>{element.name}</Text>
        </td>
        <td>
          <Text>{element.address}</Text>
        </td>
        <td>
          <Badge color={badgeColor}>{orderStatus}</Badge>
        </td>
        <td>
          <Text fw={600}>₹{element.price}</Text>
        </td>
        <td>{element.time}</td>
      </tr>
    );
  });
  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" m={8}>
        <Flex align="center" gap={16} justify="space-between">
          <Flex gap={10} justify="center" align="center" wrap="wrap">
            <Image
              src="https://ik.imagekit.io/ashishkk22/pizza/recent_orders.svg"
              width={34}
            />
            <Text fz="md">Orders</Text>
          </Flex>
          <Input
            icon={<IconSearch />}
            placeholder="Search orders by name ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Flex>
      </Card>
      <Card shadow="sm" padding="lg" radius="md" m={8}>
        <ScrollArea w={'100%'}>
          {rows.length > 1 ? (
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
              <Flex justify="flex-end" my={20}>
                <Pagination total={2} size="md" />
              </Flex>
            </>
          ) : (
            <Text>No data found !</Text>
          )}
        </ScrollArea>
      </Card>
    </>
  );
};

export default Orders;
