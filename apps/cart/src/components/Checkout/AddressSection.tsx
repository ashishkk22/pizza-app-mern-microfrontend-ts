import React, { MutableRefObject, useState } from 'react';
import AddressCard from './AddressCard';

const addressData = [
  {
    id: 22,
    name: 'ashish',
    address:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non iste corrupti ipsa Lorem ipsum dolor sit amet.',
  },
  {
    id: 1,
    name: 'ashish',
    address:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non iste corrupti ipsa Lorem ipsum dolor sit amet.',
  },
  {
    id: 2,
    name: 'ashish',
    address:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non iste corrupti ipsa Lorem ipsum dolor sit amet.',
  },
  {
    id: 3,
    name: 'ashish',
    address:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non iste corrupti ipsa Lorem ipsum dolor sit amet.',
  },
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
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non iste corrupti ipsa Lorem ipsum dolor sit amet.',
  },
];
const AddressSection = () => {
  const [active, setActive] = useState<number | undefined>();
  const handleAddress = (id: number) => {
    setActive(id);
  };

  return (
    <>
      {addressData.map((address) => {
        return (
          <AddressCard
            name={address.name}
            key={address.id}
            address={address.address}
            isActive={active === address.id}
            handleActive={() => handleAddress(address.id)}
          />
        );
      })}
    </>
  );
};

export default AddressSection;
