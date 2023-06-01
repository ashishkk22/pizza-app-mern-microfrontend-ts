import React, { FC, useReducer } from 'react';
import { Button, Container, Switch, TextInput, Input } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { IconTrash } from '@tabler/icons-react';
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from '../../utils/api';
import queryClient from '../../utils/client';
import {
  CreateCategoryBody,
  DeleteCategoryBody,
  UpdateCategoryBody,
} from '../../utils/endPoint.type';

type AddCategoryProps = {
  closeModel: () => void;
  totalPage: number | undefined;
  currentCategory: {
    id: string;
    name: string;
    status: string;
  };
  currentPage: number;
};

//getting closeModal and tatalPage so that we can invalidate the last page only any we don't have to refetch all the pages
const AddCategory: FC<AddCategoryProps> = ({
  closeModel,
  totalPage,
  currentCategory,
  currentPage,
}) => {
  //to check status from prop and then set the status
  let categoryStatus = true;
  if (currentCategory?.status === 'draft') {
    categoryStatus = false;
  }
  const [checked, toggleChecked] = useReducer(
    (state) => !state,
    categoryStatus
  );

  //to validate the form
  const form = useForm({
    initialValues: {
      category: currentCategory?.name ?? '',
    },
    validate: {
      category: (val: string) =>
        val.length <= 2 ? 'Please enter the valid category name!' : null,
    },
  });

  //to create the category
  const createMutation = useMutation({
    mutationFn: (body: CreateCategoryBody) => createCategory(body),
    onError: () => {
      toast.error('Create category failed ! give unique id');
    },
    onSuccess: () => {
      //invalidate the last page
      queryClient.invalidateQueries({
        queryKey: ['categories', totalPage],
      });
      if (currentPage === 1) {
        queryClient.invalidateQueries({
          queryKey: ['categories'],
        });
      }
      selectCategoryInvalidate();
      closeModel();
      toast.success('Category Created successfully !');
    },
  });

  //to update the category
  const updateMutation = useMutation({
    mutationFn: (body: UpdateCategoryBody) => updateCategory(body),
    onError: () => {
      toast.error('Category update failed !');
    },
    onSuccess: () => {
      //invalidate the current page
      queryClient.invalidateQueries({
        queryKey: ['categories', currentPage],
      });
      selectCategoryInvalidate();
      closeModel?.();
      toast.success('Category updated successfully !');
    },
  });

  //to delete the category
  const deleteMutation = useMutation({
    mutationFn: (body: DeleteCategoryBody) => deleteCategory(body),
    onError: () => {
      toast.error('Categeory delete failed');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      });
      selectCategoryInvalidate();
      closeModel?.();
      toast.success('Category deleted successfully');
    },
  });

  const selectCategoryInvalidate = () => {
    queryClient.invalidateQueries({
      queryKey: ['selectCategory'],
    });
  };

  return (
    <Container size="xs" px="xs">
      <form
        onSubmit={form.onSubmit((val) => {
          const status = checked ? 'published' : 'draft';
          if (currentCategory?.id) {
            updateMutation.mutate({
              updatedName: val.category,
              updatedStatus: status,
              categoryId: currentCategory.id,
            });
          } else {
            createMutation.mutate({
              categoryName: val.category,
              status: status,
            });
          }
        })}
      >
        <Input.Wrapper label="Category Name" withAsterisk>
          <TextInput
            placeholder="Enter the category"
            size="md"
            mt="xs"
            withAsterisk
            autoFocus
            {...form.getInputProps('category')}
          />
        </Input.Wrapper>

        <Switch
          label="Publish"
          my={18}
          checked={checked}
          onChange={toggleChecked}
        />
        <Button
          fullWidth
          mt="xl"
          size="md"
          type="submit"
          loading={createMutation.isLoading || updateMutation.isLoading}
        >
          {currentCategory.id ? 'Update Category' : 'Add Category'}
        </Button>
        {currentCategory.id && (
          <Button
            variant="subtle"
            leftIcon={<IconTrash />}
            fullWidth
            mt="sm"
            size="md"
            loading={deleteMutation.isLoading}
            onClick={() =>
              deleteMutation.mutate({ categoryId: currentCategory.id })
            }
          >
            Delete Category
          </Button>
        )}
      </form>
    </Container>
  );
};

export default AddCategory;
