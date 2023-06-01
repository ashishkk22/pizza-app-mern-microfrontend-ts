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
import { Product } from '../../utils/endPoint.type';
import { useNavigate } from 'react-router-dom';
import { getBadgeColor } from '../../utils/getBadgeColor';

type ProductListProps = {
  data: Product[];
  tableHeading: string[];
  currentCategory: string;
  currentStatus: string;
  currentQuery: string;
  totalPage: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
};

const ProductList: FC<ProductListProps> = ({
  currentCategory = '',
  currentStatus = '',
  currentQuery = '',
  tableHeading,
  data,
  setCurrentPage,
  totalPage,
  currentPage,
}) => {
  //header of the table
  const ths = (
    <tr>
      {tableHeading.map((heading) => {
        return <th key={heading}>{heading}</th>;
      })}
    </tr>
  );

  //filtered data from the applied filters
  const filteredData = data.filter((order) => {
    const status = order.publish ? 'published' : 'draft';
    return (
      order.name.toLowerCase().includes(currentQuery.toLowerCase()) &&
      status.toLowerCase().includes(currentStatus.toLowerCase()) &&
      order.category.toLowerCase().includes(currentCategory.toLowerCase())
    );
  });

  //navigate instance
  const navigate = useNavigate();

  //row of the table
  const rows = filteredData.map((product, index) => {
    const status = product.publish ? 'published' : 'draft';
    const badgeColor = getBadgeColor(status);

    return (
      <tr
        key={product.name + index}
        style={{ cursor: 'pointer' }}
        onClick={() => navigate('/products/edit', { state: product })}
      >
        <td>
          <Flex w={70}>
            <Image src={product.image} alt={product.name} />
          </Flex>
        </td>
        <td>
          <Text fw={600}>{product.name}</Text>
        </td>
        <td>
          <Text>{product.description}</Text>
        </td>
        <td>
          <Text tt="uppercase">{product.category}</Text>
        </td>
        <td>
          <Badge color={badgeColor}>{status}</Badge>
        </td>
        <td>{product.createdAt.substring(0, 10)}</td>
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

export default ProductList;
