import {
  Button,
  Card,
  Container,
  Flex,
  Image,
  Input,
  Loader,
  Modal,
  Text,
} from '@mantine/core';
import React, { useState } from 'react';
import { IconSearch } from '@tabler/icons-react';
import CategoryList from './CategoryList';
import { useDisclosure } from '@mantine/hooks';
import ManageCategory from './ManageCategory';
import { useQuery } from '@tanstack/react-query';
import { getCategories, displayErrorMsg } from '../../utils/api';

const initialValues = {
  name: '',
  id: '',
  status: '',
};

const Categories = () => {
  //to search in the table
  const [search, setSearch] = useState('');

  const [currentCategory, setCurrentCategory] = useState(initialValues);

  const [opened, { open, close }] = useDisclosure(false);
  //to set and update the page in table
  const [page, setPage] = useState(1);

  //to fetch the data based on the page
  const { data, error } = useQuery(
    ['categories', page],
    () => getCategories(page),
    { keepPreviousData: true }
  );

  //to reset empty the search state
  const filterResetHandler = () => {
    setSearch('');
  };

  //if entire last page is deleted then reduce the page number
  if (data?.data.categories.length === 0 && page > 1) {
    setPage((page) => page - 1);
  }

  //if error from backend then display the toast
  if (error) {
    displayErrorMsg(error);
  }
  return (
    <Container>
      <Card shadow="sm" padding="lg" radius="md" my={8}>
        <Flex align="center" gap={16} justify="space-between" wrap="wrap">
          <Flex gap={10} justify="center" align="center" wrap="wrap">
            <Image
              src="https://ik.imagekit.io/ashishkk22/pizza/Group_150.svg"
              width={34}
            />
            <Text fz="md">Products</Text>
          </Flex>
          <Flex gap={10} justify="center" align="center" wrap="wrap">
            <Input
              icon={<IconSearch />}
              placeholder="Search product by name ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="subtle" onClick={filterResetHandler}>
              Reset
            </Button>
            <Button
              onClick={() => {
                setCurrentCategory(initialValues);
                open();
              }}
            >
              + Create category
            </Button>
          </Flex>
        </Flex>
      </Card>
      {data?.data?.categories ? (
        <CategoryList
          data={data.data.categories}
          totalPage={data.data?.totalPages}
          setCurrentPage={(page: number) => setPage(page)}
          currentPage={page}
          currentQuery={search}
          tableHeading={['Category Name', 'Status ', 'Created At']}
          setCurrentCategory={(name: string, id: string, status: string) => {
            setCurrentCategory({ name, id, status });
            open();
          }}
        />
      ) : (
        <Flex justify="center">
          <Loader />
        </Flex>
      )}
      <Modal
        opened={opened}
        onClose={close}
        title={currentCategory.id ? 'Update category' : 'Add category'}
        centered
      >
        <ManageCategory
          closeModel={close}
          totalPage={data?.data?.totalPages}
          currentCategory={currentCategory}
          currentPage={page}
        />
      </Modal>
    </Container>
  );
};

export default Categories;
