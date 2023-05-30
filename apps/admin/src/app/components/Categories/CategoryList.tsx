import {
  Badge,
  Card,
  Flex,
  Pagination,
  ScrollArea,
  Table,
  Text,
} from '@mantine/core';
import React, { FC } from 'react';
import { getProductStatus, getBadgeColor } from '../../utils/getProductStatus';

const elements = [
  {
    category: 'Pizza',
    status: 'published',
    createdAt: '22 january 2002',
  },
  {
    category: 'Cold drinks',
    createdAt: '22 january 2002',
    status: 'draft',
  },
  {
    category: 'Cold drinks',
    createdAt: '22 january 2002',
    status: 'published',
  },
  {
    category: 'Juice',
    createdAt: '22 january 2002',
    status: 'draft',
  },
  {
    category: 'Pizza',
    createdAt: '22 january 2002',
    status: 'published',
  },
  {
    category: 'Cold drinks',

    createdAt: '22 january 2002',
    status: 'draft',
  },
  {
    category: 'Cold drinks',

    createdAt: '22 january 2002',
    status: 'published',
  },
  {
    category: 'Juice',
    createdAt: '22 january 2002',
    status: 'draft',
  },
];

type CategoryListProps = {
  currentQuery: string;
};

const CategoryList: FC<CategoryListProps> = ({ currentQuery }) => {
  const ths = (
    <tr>
      <th>Category name</th>
      <th>Status</th>
      <th>Created At</th>
    </tr>
  );
  const filteredData = elements.filter((order) => {
    return order.category.toLowerCase().includes(currentQuery.toLowerCase());
  });

  const rows = filteredData.map((element, index) => {
    const status = getProductStatus(element.status);
    const badgeColor = getBadgeColor(element.status);
    return (
      <tr key={element.category + index} style={{ cursor: 'pointer' }}>
        <td>
          <Text fw={600}>{element.category}</Text>
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

export default CategoryList;
