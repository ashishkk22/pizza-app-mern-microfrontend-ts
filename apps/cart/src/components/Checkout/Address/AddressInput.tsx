import { Button, Container, TextInput, Textarea } from '@mantine/core';
import React, { FC } from 'react';
import { useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { addAddress } from '../../../utils/api';
import { AddAddressBody } from '../../../utils/Endpoints.type';
import { toast } from 'react-hot-toast';
import { queryClient } from '@pizza-app/ui-shared';

type AddressInputType = {
  modalClose: () => void;
};

const AddressInput: FC<AddressInputType> = ({ modalClose }) => {
  const form = useForm({
    initialValues: {
      name: '',
      address: '',
    },
    validate: {
      name: (val) => (val.length <= 6 ? 'Please enter full name !' : null),
      address: (val) =>
        /^.{20,180}$/.test(val)
          ? null
          : 'Please provide valid 20-180 char long address !',
    },
  });
  const addAddressMutation = useMutation({
    mutationFn: (data: AddAddressBody) => addAddress(data),
    onError: () => {
      toast.error('Input all the fields');
    },
    onSuccess: () => {
      //invalidate the last page
      queryClient.invalidateQueries({
        queryKey: ['address'],
      });
      modalClose();
      toast.success('Address added successfully !');
    },
  });
  return (
    <Container size="xs" px="xs">
      <form
        onSubmit={form.onSubmit((val) => {
          addAddressMutation.mutate({ address: val.address, name: val.name });
        })}
      >
        <TextInput
          label="Name"
          placeholder="John Doe"
          size="md"
          withAsterisk
          {...form.getInputProps('name')}
        />
        <Textarea
          placeholder="Your address"
          label="Address"
          withAsterisk
          size="md"
          minRows={4}
          mt={12}
          {...form.getInputProps('address')}
        />
        <Button fullWidth mt="xl" size="md" type="submit">
          Add Address
        </Button>
      </form>
    </Container>
  );
};

export default AddressInput;
