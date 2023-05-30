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
import { getBadgeColor, getPromoStatus } from '../../utils/getPromoStatus';

const elements = [
  {
    name: 'SUNFUN522',
    status: 'valid',
    createdAt: '22 january 2002',
    off_Percentage: '10%',
    valid_till: '30 june 2023',
  },
  {
    name: 'SUNFUN522',
    createdAt: '22 january 2002',
    status: 'expired',
    off_Percentage: '10%',
    valid_till: '30 june 2023',
  },
  {
    name: 'SUNFUN522',
    createdAt: '22 january 2002',
    status: 'valid',
    off_Percentage: '10%',
    valid_till: '30 june 2023',
  },
  {
    name: 'SUNFUN522',
    createdAt: '22 january 2002',
    status: 'expired',
    off_Percentage: '10%',
    valid_till: '30 june 2023',
  },
  {
    name: 'SUNFUN522',
    createdAt: '22 january 2002',
    status: 'valid',
    off_Percentage: '10%',
    valid_till: '30 june 2023',
  },
  {
    name: 'SUNFUN522',
    createdAt: '22 january 2002',
    status: 'valid',
    off_Percentage: '10%',
    valid_till: '30 june 2023',
  },
  {
    name: 'SUNFUN522',
    createdAt: '22 january 2002',
    status: 'expired',
    off_Percentage: '10%',
    valid_till: '30 june 2023',
  },
  {
    name: 'SUNFUN522',
    createdAt: '22 january 2002',
    status: 'valid',
    off_Percentage: '10%',
    valid_till: '30 june 2023',
  },
];

type PromosListProps = {
  currentQuery: string;
};

const PromosList: FC<PromosListProps> = ({ currentQuery }) => {
  const ths = (
    <tr>
      <th>Coupon name</th>
      <th>Off percentage</th>
      <th>Status</th>
      <th>Valid till</th>
      <th>Created At</th>
    </tr>
  );
  const filteredData = elements.filter((order) => {
    return order.name.toLowerCase().includes(currentQuery.toLowerCase());
  });

  const rows = filteredData.map((element, index) => {
    const status = getPromoStatus(element.status);
    const badgeColor = getBadgeColor(element.status);
    return (
      <tr key={element.name + index} style={{ cursor: 'pointer' }}>
        <td>
          <Text fw={600}>{element.name}</Text>
        </td>
        <td>{element.off_Percentage}</td>
        <td>
          <Badge color={badgeColor}>{status}</Badge>
        </td>
        <td>{element.valid_till}</td>
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

export default PromosList;
