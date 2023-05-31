import {
  Button,
  Card,
  Container,
  Flex,
  NumberInput,
  Select,
  Switch,
  Text,
  TextInput,
  Textarea,
} from '@mantine/core';
import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '../../../utils/api';

const CreateProduct = () => {
  const [category, setCategory] = useState('');

  const { data } = useQuery(['selectCategory'], getAllCategories);

  const categoryArray =
    data?.data.categories.map((category) => {
      return { value: category.name, label: category.name.toUpperCase() };
    }) ?? [];

  return (
    <Container>
      <Card shadow="sm" padding="lg" radius="md" my={8} w={'100%'}>
        <Text fz={'lg'} fw={600}>
          Product info
        </Text>
        <TextInput
          label="Product name"
          placeholder="Enter product name"
          mt="md"
          withAsterisk
        />
        <Select
          label="Product Category"
          placeholder="Category"
          data={categoryArray}
          withinPortal
          mt="md"
          value={category}
          onChange={(e) => e && setCategory(e)}
        />
        <Textarea
          label="Description"
          placeholder="Tell something about product"
          mt="md"
          withAsterisk
          minRows={4}
        />
      </Card>
      <Card shadow="sm" padding="lg" radius="md" my={8} w={'100%'}>
        <Text fz={'lg'} fw={600}>
          Product Image
        </Text>
        <ImageUpload />
      </Card>
      <Card shadow="sm" padding="lg" radius="md" my={8} w={'100%'}>
        <Text fz={'lg'} fw={600}>
          Product price
        </Text>
        <Flex gap={6} w={'100%'} justify="space-between" wrap="wrap">
          <NumberInput label="Price" placeholder="522" mt="md" withAsterisk />
        </Flex>
      </Card>

      <Card shadow="sm" padding="lg" radius="md" my={8}>
        <Text fz={'lg'} fw={600}>
          Other properties
        </Text>
        <Switch label="Show as hit product" my={18} />
        <Switch label="Publish" my={18} />
        <Switch label="Available" my={18} />
      </Card>
      <Flex gap={8} justify="flex-end">
        <Button>Submit</Button>
        <Button variant="outline">Cancel</Button>
      </Flex>
    </Container>
  );
};

export default CreateProduct;
