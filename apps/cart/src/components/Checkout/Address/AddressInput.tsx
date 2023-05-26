import { Button, Container, TextInput, Textarea } from '@mantine/core';
import React from 'react';
import { useForm } from '@mantine/form';

const AddressInput = () => {
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
          : 'Please provide valid 20-50 char long address !',
    },
  });
  return (
    <Container size="xs" px="xs">
      <form
        onSubmit={form.onSubmit((val) => {
          console.log(val);
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
