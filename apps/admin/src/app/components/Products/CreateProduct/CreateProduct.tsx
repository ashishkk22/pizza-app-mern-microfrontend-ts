import {
  Button,
  Card,
  Container,
  Flex,
  NumberInput,
  SegmentedControl,
  Switch,
  Text,
  TextInput,
  Textarea,
} from '@mantine/core';
import React, { useState } from 'react';
import ImageUpload from './ImageUpload';

const CreateProduct = () => {
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
        <TextInput
          label="Product category"
          placeholder="Enter product category"
          mt="md"
          withAsterisk
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
          <NumberInput label="Small" placeholder="522" mt="md" withAsterisk />
          <NumberInput label="Medium" placeholder="22" mt="md" withAsterisk />
          <NumberInput label="Large" placeholder="522" mt="md" withAsterisk />
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
