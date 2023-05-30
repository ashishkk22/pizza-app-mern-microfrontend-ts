import {
  Button,
  Card,
  Container,
  Flex,
  Image,
  Input,
  Modal,
  Text,
} from '@mantine/core';
import React, { useState } from 'react';
import { IconSearch } from '@tabler/icons-react';
import CategoryList from './CategoryList';
import { useDisclosure } from '@mantine/hooks';
import AddCategory from './AddCategory';

const Categories = () => {
  const [search, setSearch] = useState('');
  const [opened, { open, close }] = useDisclosure(false);
  const filterResetHandler = () => {
    setSearch('');
  };
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
                open();
              }}
            >
              + Create category
            </Button>
          </Flex>
        </Flex>
      </Card>
      <CategoryList currentQuery={search} />
      <Modal opened={opened} onClose={close} title="Add Address" centered>
        <AddCategory />
      </Modal>
    </Container>
  );
};

export default Categories;
