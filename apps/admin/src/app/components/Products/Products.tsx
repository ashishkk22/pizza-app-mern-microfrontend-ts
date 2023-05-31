import { Button, Card, Flex, Image, Input, Select, Text } from '@mantine/core';
import React, { useState } from 'react';
import { IconSearch } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import ProductList from './ProductList';
import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '../../utils/api';

const Products = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  console.log(search, category, status);

  const { data } = useQuery(['selectCategory'], getAllCategories);

  const categoryArray =
    data?.data.categories.map((category) => {
      return { value: category.name, label: category.name.toUpperCase() };
    }) ?? [];

  const filterResetHandler = () => {
    setSearch('');
    setCategory('');
    setStatus('');
  };
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
      <ProductList
        currentCategory={category}
        currentQuery={search}
        currentStatus={status}
      />
    </>
  );
};

export default Products;
