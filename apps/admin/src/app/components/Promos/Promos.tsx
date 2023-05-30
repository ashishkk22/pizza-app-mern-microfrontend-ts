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
import { useDisclosure } from '@mantine/hooks';
import PromosList from './PromosList';
import AddPromo from './AddPromo';

const Promos = () => {
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
              src="https://ik.imagekit.io/ashishkk22/pizza/Coupon-icon.svg"
              width={34}
            />
            <Text fz="md">Promos</Text>
          </Flex>
          <Flex gap={10} justify="center" align="center" wrap="wrap">
            <Input
              icon={<IconSearch />}
              placeholder="Search promos by name ..."
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
      <PromosList currentQuery={search} />
      <Modal opened={opened} onClose={close} title="Add Address" centered>
        <AddPromo />
      </Modal>
    </Container>
  );
};

export default Promos;
