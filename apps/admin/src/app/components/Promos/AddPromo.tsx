import { Button, Container, Switch, TextInput } from '@mantine/core';
import React from 'react';
import { useForm } from '@mantine/form';

//getting closeModal and tatalPage so that we can invalidate the last page only any we don't have to refetch all the pages
const ManagePromo = () => {
  const form = useForm({
    initialValues: {
      coupon: '',
    },
    validate: {
      coupon: (val) =>
        val.length <= 2 ? 'Please enter the valid coupon name!' : null,
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
          label="Coupon Name"
          placeholder="Enter the coupon"
          size="md"
          mt="md"
          withAsterisk
          {...form.getInputProps('coupon')}
        />
        <Switch label="Publish" my={18} />
        <Button fullWidth mt="xl" size="md" type="submit">
          Add Category
        </Button>
      </form>
    </Container>
  );
};

export default ManagePromo;
