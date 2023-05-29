import {
  Badge,
  Card,
  Flex,
  Image,
  Pagination,
  ScrollArea,
  Table,
  Text,
} from '@mantine/core';
import React, { FC } from 'react';
import { getProductStatus, getBadgeColor } from '../../utils/getProductStatus';

const elements = [
  {
    name: 'Pepperoni Pizza',
    category: 'Pizza',
    image:
      'https://ik.imagekit.io/ashishkk22/pizza-banner.svg?updatedAt=1684733181767',
    description: 'Lorem ipsum dolor sit amet consecteturenetur!',
    createdAt: '22 january 2002',
    status: 'published',
  },
  {
    name: 'Juice Orange',
    category: 'Cold drinks',
    image:
      'https://ik.imagekit.io/ashishkk22/juice-orange.svg?updatedAt=1684695220145',
    description: 'Lorem ipsum do runt magni similique sequi tenetur!',
    createdAt: '22 january 2002',
    status: 'draft',
  },
  {
    name: 'Margherita Pizza',
    category: 'Cold drinks',
    size: 'small',
    image:
      'https://ik.imagekit.io/ashishkk22/Margherita-pizza.svg?updatedAt=1684693393350',
    description: 'Lorem ipsum d serunt magni similique sequi tenetur!',
    createdAt: '22 january 2002',
    status: 'published',
  },
  {
    name: 'Juice Orange',
    category: 'Juice',
    image:
      'https://ik.imagekit.io/ashishkk22/juice-orange.svg?updatedAt=1684695220145',
    description:
      'Lorem ipsum dolor s sMaxime deserunt magni similique sequi tenetur!',
    createdAt: '22 january 2002',
    status: 'draft',
  },
  {
    name: 'Pepperoni Pizza',
    category: 'Pizza',
    image:
      'https://ik.imagekit.io/ashishkk22/pizza-banner.svg?updatedAt=1684733181767',
    description: 'Lorem ipsum dolor sit amet consecteturenetur!',
    createdAt: '22 january 2002',
    status: 'published',
  },
  {
    name: 'Juice Orange',
    category: 'Cold drinks',
    image:
      'https://ik.imagekit.io/ashishkk22/juice-orange.svg?updatedAt=1684695220145',
    description: 'Lorem ipsum do runt magni similique sequi tenetur!',
    createdAt: '22 january 2002',
    status: 'draft',
  },
  {
    name: 'Margherita Pizza',
    category: 'Cold drinks',
    size: 'small',
    image:
      'https://ik.imagekit.io/ashishkk22/Margherita-pizza.svg?updatedAt=1684693393350',
    description: 'Lorem ipsum d serunt magni similique sequi tenetur!',
    createdAt: '22 january 2002',
    status: 'published',
  },
  {
    name: 'Juice Orange',
    category: 'Juice',
    image:
      'https://ik.imagekit.io/ashishkk22/juice-orange.svg?updatedAt=1684695220145',
    description:
      'Lorem ipsum dolor s sMaxime deserunt magni similique sequi tenetur!',
    createdAt: '22 january 2002',
    status: 'draft',
  },
];

type ProductListProps = {
  currentCategory: string;
  currentStatus: string;
  currentQuery: string;
};

const ProductList: FC<ProductListProps> = ({
  currentCategory = '',
  currentStatus = '',
  currentQuery = '',
}) => {
  const ths = (
    <tr>
      <th>Product Image</th>
      <th>Product name</th>
      <th>Description</th>
      <th>Category</th>
      <th>Status</th>
      <th>Created At</th>
    </tr>
  );
  const filteredData = elements.filter((order) => {
    return (
      order.name.toLowerCase().includes(currentQuery.toLowerCase()) &&
      order.status.toLowerCase().includes(currentStatus.toLowerCase()) &&
      order.category.toLowerCase().includes(currentCategory.toLowerCase())
    );
  });

  const rows = filteredData.map((element, index) => {
    const status = getProductStatus(element.status);
    const badgeColor = getBadgeColor(element.status);
    return (
      <tr key={element.name + index} style={{ cursor: 'pointer' }}>
        <td>
          <Flex w={70}>
            <Image src={element.image} alt={element.name} />
          </Flex>
        </td>
        <td>
          <Flex justify="center" gap={10} align="center">
            <Text fw={600}>{element.name}</Text>
          </Flex>
        </td>
        <td>
          <Text>{element.description}</Text>
        </td>
        <td>
          <Text>{element.category}</Text>
        </td>
        <td>
          <Badge color={badgeColor}>{status}</Badge>
        </td>
        <td>{element.createdAt}</td>
      </tr>
    );
  });
  return (
    <Card shadow="sm" padding="lg" radius="md" my={8}>
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
  );
};

export default ProductList;
