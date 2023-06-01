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
import { getBadgeColor } from '../../utils/getPromoStatus';
import { Coupon } from '../../utils/endPoint.type';

type PromosListProps = {
  currentQuery: string;
  data: Coupon[];
  tableHeading: string[];
  totalPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  setCurrentCoupon: (
    name: string,
    id: string,
    percentage: number,
    status: string
  ) => void;
};

const PromosList: FC<PromosListProps> = ({
  currentQuery,
  data,
  tableHeading,
  totalPage,
  currentPage,
  setCurrentPage,
  setCurrentCoupon,
}) => {
  const ths = (
    <tr>
      {tableHeading.map((heading) => {
        return <th key={heading}>{heading}</th>;
      })}
    </tr>
  );
  const filteredData = data.filter((coupon) => {
    return coupon.name.toLowerCase().includes(currentQuery.toLowerCase());
  });

  const rows = filteredData.map((coupon, index) => {
    const badgeColor = getBadgeColor(coupon.status);
    return (
      <tr
        key={coupon.name + index}
        style={{ cursor: 'pointer' }}
        onClick={() =>
          setCurrentCoupon(
            coupon.name,
            coupon._id,
            coupon.percentage,
            coupon.status
          )
        }
      >
        <td>
          <Text fw={600}>{coupon.name}</Text>
        </td>
        <td>{coupon.percentage}</td>
        <td>
          <Badge color={badgeColor}>{coupon.status}</Badge>
        </td>
        <td>{coupon.createdAt.substring(0, 10)}</td>
      </tr>
    );
  });

  return (
    <Card shadow="sm" padding="lg" radius="md" my={8}>
      <ScrollArea w={'100%'}>
        {rows.length >= 1 ? (
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
              <Pagination
                total={totalPage}
                size="md"
                value={currentPage}
                onChange={(page) => setCurrentPage(page)}
                siblings={1}
              />
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
