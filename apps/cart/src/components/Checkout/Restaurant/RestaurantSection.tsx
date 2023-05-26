import { Flex, Text } from '@mantine/core';
import React, { FC, useState } from 'react';
import RestaurantCard from '../SelectionCard';
const addressData = [
  {
    id: 1,
    name: 'ashish',
    address:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non iste corrupti ipsa Lorem ipsum dolor sit amet.',
  },
];
type RestaurantProps = {
  activeAddress: (id: number) => void;
};

const RestaurantSection: FC<RestaurantProps> = ({ activeAddress }) => {
  const [active, setActive] = useState<number | undefined>();

  const setActiveAddress = (id: number) => {
    activeAddress(id);
    setActive(id);
  };

  return (
    <>
      <Text mt={16}>Restaurant</Text>
      <Flex direction="row" gap={'lg'} wrap={'wrap'} mt={16}>
        {addressData.map((address) => {
          return (
            <RestaurantCard
              name={address.name}
              key={address.id}
              address={address.address}
              isActive={active === address.id}
              handleActive={() => setActiveAddress(address.id)}
            />
          );
        })}
      </Flex>
    </>
  );
};

export default RestaurantSection;
