import {
  Button,
  Card,
  Flex,
  Image,
  Input,
  Loader,
  Select,
  Text,
} from '@mantine/core';
import React, { useState } from 'react';
import { IconSearch } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import ProductList from './ProductList';
import { useQuery } from '@tanstack/react-query';
import {
  displayErrorMsg,
  getAllCategories,
  getProducts,
} from '../../utils/api';

const Products = () => {
  //state to filter the products
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');

  //getting the data and making the categoryArray
  const { data, error: categoryError } = useQuery(
    ['selectCategory'],
    getAllCategories
  );

  const categoryArray =
    data?.data.categories.map((category) => {
      return { value: category.name, label: category.name.toUpperCase() };
    }) ?? [];

  //calling to reset the filters
  const filterResetHandler = () => {
    setSearch('');
    setCategory('');
    setStatus('');
  };

  //to set and update the page in table
  const [page, setPage] = useState(1);

  const { data: products, error: productError } = useQuery(
    ['products', page],
    () => getProducts(page),
    { keepPreviousData: true }
  );

  //display the error msg while fetching the data
  if (productError || categoryError) {
    if (productError) {
      displayErrorMsg(productError);
    } else {
      displayErrorMsg(categoryError);
    }
  }
  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" my={8}>
        <Flex align="center" gap={16} justify="space-between" wrap="wrap">
          <Flex gap={10} justify="center" align="center" wrap="wrap">
            <Image
              src="https://ik.imagekit.io/ashishkk22/pizza/total_order.svg"
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
            <Button component={Link} to={'create'}>
              + Create product
            </Button>
          </Flex>
        </Flex>
      </Card>
      <Card shadow="sm" padding="lg" radius="md" my={8}>
        <Flex align="center" justify="space-between" wrap={'wrap'}>
          <Select
            placeholder="Category"
            data={categoryArray}
            withinPortal
            value={category}
            onChange={(e) => e && setCategory(e)}
            w={'49%'}
          />
          <Select
            placeholder="Status"
            data={[
              { value: 'published', label: 'PUBLISHED' },
              { value: 'draft', label: 'DRAFT' },
            ]}
            withinPortal
            value={status}
            onChange={(e) => e && setStatus(e)}
            w={'49%'}
          />
        </Flex>
      </Card>
      {products?.data?.items ? (
        <ProductList
          data={products.data.items}
          totalPage={products.data.totalPages}
          setCurrentPage={(page: number) => setPage(page)}
          currentPage={page}
          currentCategory={category}
          currentQuery={search}
          currentStatus={status}
          tableHeading={[
            'Product Image',
            'Product name',
            'Description',
            'Category',
            'Status',
            'Created At',
          ]}
        />
      ) : (
        <Flex justify="center">
          <Loader />
        </Flex>
      )}
    </>
  );
};

export default Products;
