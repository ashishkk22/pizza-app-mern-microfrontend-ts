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
import { Category } from '../../utils/endPoint.type';

type CategoryListProps = {
  currentQuery: string;
  data: Category[];
  tableHeading: string[];
  totalPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  setCurrentCategory: (name: string, id: string, status: string) => void;
};

const CategoryList: FC<CategoryListProps> = ({
  currentQuery,
  data,
  tableHeading,
  totalPage,
  currentPage,
  setCurrentPage,
  setCurrentCategory,
}) => {
  //table heading from heading array
  const ths = (
    <tr>
      {tableHeading.map((heading) => {
        return <th key={heading}>{heading}</th>;
      })}
    </tr>
  );

  //filter the data based on the search
  const filteredData = data.filter((category) => {
    return category.name.toLowerCase().includes(currentQuery.toLowerCase());
  });

  //table rows based on the category data
  const rows = filteredData.map((element, index) => {
    const status = getProductStatus(element.status);
    const badgeColor = getBadgeColor(element.status);
    return (
      <tr
        key={element.name + index}
        style={{ cursor: 'pointer' }}
        onClick={() =>
          setCurrentCategory(element.name, element._id, element.status)
        }
      >
        <td>
          <Text fw={600}>{element.name}</Text>
        </td>
        <td>
          <Badge color={badgeColor}>{status}</Badge>
        </td>
        <td>{element.createdAt.substring(0, 10)}</td>
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

export default CategoryList;
