import {
  Button,
  Container,
  Flex,
  Loader,
  Pagination,
  Select,
  Title,
} from '@mantine/core';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllCategories, getProducts } from '../../utils/api';
import { useCartReducer } from '@pizza-app/redux-store';
import ProductCard from './ProductCard';

const Category = () => {
  const [category, setCategory] = useState('');

  //addToCart reducer to add the item in the cart
  const { addToCart } = useCartReducer();

  //getting the categories
  const { data, isLoading } = useQuery(['categories'], getAllCategories);

  //making the categoryArray to filter the data
  const categoryArray =
    data?.data.categories.map((category) => {
      return { value: category.name, label: category.name.toUpperCase() };
    }) ?? [];

  //to set and update the page in table
  const [page, setPage] = useState(1);

  //getting the product data
  const { data: products } = useQuery(
    ['products', page],
    () => getProducts(page),
    { keepPreviousData: true }
  );

  const filteredProduct = category
    ? products?.data.items.filter((product) => {
        return product.category.toLowerCase().includes(category.toLowerCase());
      })
    : products?.data.items;
  return (
    <Container py={20}>
      <Flex justify="space-between" align="center" wrap={'wrap'}>
        <Title color="brand.9" order={3} py={20}>
          Products
        </Title>
      </Flex>
      <Flex justify={'flex-end'} m={12}>
        <Select
          placeholder="Category"
          data={categoryArray}
          withinPortal
          value={category}
          onChange={(e) => e && setCategory(e)}
          mr={4}
        />
        <Button onClick={() => setCategory('')}>Reset</Button>
      </Flex>
      <Flex
        gap="md"
        align="center"
        direction="row"
        wrap="wrap"
        justify="center"
      >
        {isLoading && <Loader />}
        {filteredProduct?.map(({ description, name, image, _id, price }) => {
          return (
            <ProductCard
              description={description}
              image={image}
              name={name}
              onClick={() =>
                addToCart({
                  id: _id,
                  name,
                  image,
                  description,
                  price,
                })
              }
              price={price}
            />
          );
        })}
      </Flex>

      {products?.data.totalPages && (
        <Flex justify="flex-end" my={20}>
          <Pagination
            total={products?.data.totalPages}
            size="md"
            mt={'lg'}
            value={page}
            onChange={(page) => setPage(page)}
            siblings={1}
          />
        </Flex>
      )}
    </Container>
  );
};

export default Category;
