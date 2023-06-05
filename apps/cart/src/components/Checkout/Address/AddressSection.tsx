import React, { useState } from 'react';
import { Card, Flex, Image, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { toast } from 'react-hot-toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import AddressCard from '../SelectionCard';
import AddressInput from './AddressInput';
import { getAddress, deleteAddress } from '../../../utils/api';
import { DeleteAddressBody, AddressType } from '../../../utils/Endpoints.type';
import { queryClient } from '@pizza-app/ui-shared';

type AddressSectionProps = {
  activeAddress: (data: AddressType) => void;
};
const AddressSection = ({ activeAddress }: AddressSectionProps) => {
  const { data } = useQuery(['address'], getAddress);

  const [active, setActive] = useState('');
  const [opened, { open, close }] = useDisclosure(false);
  const setActiveAddress = (address: {
    _id: string;
    address: string;
    name: string;
  }) => {
    activeAddress(address);
    setActive(address._id);
  };
  const deleteAddMutation = useMutation({
    mutationFn: (data: DeleteAddressBody) => deleteAddress(data),
    onError: () => {
      toast.error('Input all the fields');
    },
    onSuccess: () => {
      //invalidate the last page
      queryClient.invalidateQueries({
        queryKey: ['address'],
      });
      toast.success('Address added successfully !');
    },
  });
  return (
    <>
      <Text>Address</Text>
      <Flex direction="row" gap={'lg'} wrap={'wrap'} mt={16}>
        {data?.data.address.map((address, idx) => {
          return (
            <AddressCard
              name={address.name}
              key={address.name + idx}
              address={address.address}
              isTrash
              onTrashBtnAction={() =>
                deleteAddMutation.mutate({ id: address._id })
              }
              isActive={active === address._id}
              handleActive={() => setActiveAddress(address)}
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
          <AddressInput modalClose={close} />
        </Modal>
      </Flex>
    </>
  );
};

export default AddressSection;
