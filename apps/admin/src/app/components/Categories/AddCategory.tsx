import { Button, Container, Switch, TextInput } from '@mantine/core';
import React from 'react';
import { useForm } from '@mantine/form';

const AddCategory = () => {
  const form = useForm({
    initialValues: {
      category: '',
    },

    validate: {
      category: (val) =>
        val.length <= 2 ? 'Please enter the valid category name!' : null,
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
          label="Category Name"
          placeholder="Enter the category"
          size="md"
          mt="md"
          withAsterisk
          {...form.getInputProps('category')}
        />
        <Switch label="Publish" my={18} />
        <Button fullWidth mt="xl" size="md" type="submit">
          Add Category
        </Button>
      </form>
    </Container>
  );
};

export default AddCategory;
