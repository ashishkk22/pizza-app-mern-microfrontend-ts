import React, { useState } from 'react';
import AddressCard from '../SelectionCard';
import { Card, Center, Flex, Grid, Image, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import AddressInput from './AddressInput';

const addressData = [
  {
    id: 4,
    name: 'ashish',
    address:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non iste corrupti ipsa Lorem ipsum dolor sit amet.',
  },
  {
    id: 5,
    name: 'ashish',
    address:
      'sdfsd fdsaf adsafd sfsadf asdf asfdsa dsf sadfds sdf sadfsdf asdf sdfsd fdsa  sddf adsf as sdfsd fdsaf adsafd sfsadf asdf asfdsa dsf sadfds sdf sadfsdf asdf sdfsd fdsa  sddf adsf as',
  },
];
type AddressSectionProps = {
  activeAddress: (id: number) => void;
};
const AddressSection = ({ activeAddress }: AddressSectionProps) => {
  const [active, setActive] = useState<number | undefined>();
  const [opened, { open, close }] = useDisclosure(false);
  const setActiveAddress = (id: number) => {
    activeAddress(id);
    setActive(id);
  };

  return (
    <>
      <Text>Address</Text>
      <Flex direction="row" gap={'lg'} wrap={'wrap'} mt={16}>
        {addressData.map((address) => {
          return (
            <AddressCard
              name={address.name}
              key={address.id}
              address={address.address}
              isActive={active === address.id}
              handleActive={() => setActiveAddress(address.id)}
            />
          );
        })}
        <Card
          onClick={() => {
            open();
          }}
          style={{ cursor: 'pointer' }}
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          w={240}
          h={210}
        >
          <Flex
            direction="column"
            justify="space-evenly"
            align="center"
            h={'100%'}
          >
            <Image
              py={12}
              src="https://ik.imagekit.io/ashishkk22/___3_.svg?updatedAt=1685078992615"
              width={40}
            />

            <Text color="gray.6" fz={'xl'} py={12}>
              Add Address
            </Text>
          </Flex>
        </Card>
        <Modal opened={opened} onClose={close} title="Add Address" centered>
          <AddressInput />
        </Modal>
      </Flex>
    </>
  );
};

export default AddressSection;
