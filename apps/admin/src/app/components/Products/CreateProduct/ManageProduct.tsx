import {
  Button,
  Card,
  Container,
  Flex,
  NumberInput,
  Select,
  Switch,
  Text,
  TextInput,
  Textarea,
} from '@mantine/core';
import React, { useReducer, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from '@mantine/form';
import ImageUpload from './ImageUpload';
import {
  createProduct,
  deleteProduct,
  getAllCategories,
  updateProduct,
} from '../../../utils/api';
import {
  CreateProductBody,
  DeleteProductBody,
  Product,
  UpdateProductBody,
} from '../../../utils/endPoint.type';
import { queryClient } from '@pizza-app/ui-shared';
import { validateProduct } from '../../../validations/ProductValidation';

const ManageProduct = () => {
  //navigate instance
  const navigate = useNavigate();

  //getting data if sended from the previous page
  const { state } = useLocation();
  const ProductData = state as Product;

  //current select category from the categories
  const [category, setCategory] = useState(ProductData?.category ?? '');

  //to get the current img from the image upload component
  const [image, setImage] = useState(ProductData?.image ?? '');

  //published , hit product and available product states
  const [publishProduct, togglePublishProduct] = useReducer(
    (state) => !state,
    ProductData?.publish ?? true
  );
  const [hitProduct, toggleHitProduct] = useReducer(
    (state) => !state,
    ProductData?.hit ?? false
  );
  const [availableProduct, toggleAvailableProduct] = useReducer(
    (state) => !state,
    ProductData?.available ?? true
  );

  // to validate and to get the values while submitting form
  const form = useForm({
    initialValues: {
      name: ProductData?.name ?? '',
      description: ProductData?.description ?? '',
      price: ProductData?.price ?? 0,
    },
    validate: (values) => validateProduct(values),
  });

  //getting all the available categories from the server
  const { data } = useQuery(['selectCategory'], getAllCategories);

  //form the data we are making category list
  const categoryArray =
    data?.data.categories.map((category) => {
      return { value: category.name, label: category.name.toUpperCase() };
    }) ?? [];

  const createMutation = useMutation({
    mutationFn: (body: CreateProductBody) => createProduct(body),
    onError: () =>
      onErrorMutation('Create product failed ! please fill all the fields'),
    onSuccess: () => {
      onSuccessMutation("'Product Created successfully !'");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (body: UpdateProductBody) => updateProduct(body),
    onError: () =>
      onErrorMutation('Update product failed ! please fill all the fields'),
    onSuccess: () => {
      onSuccessMutation('Product updated successfully');
      navigate(-1);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (body: DeleteProductBody) => deleteProduct(body),
    onError: () => onErrorMutation('Delete product failed !'),
    onSuccess: () => {
      onSuccessMutation('Product deleted successfully !');
      navigate(-1);
    },
  });

  //on success of any mutation
  const onSuccessMutation = (msg: string) => {
    queryClient.invalidateQueries({
      queryKey: ['products'],
    });
    form.reset();
    setImage('');
    setCategory('');
    toast.success(msg);
  };

  const onErrorMutation = (msg: string) => {
    toast.error(msg);
  };

  return (
    <Container>
      <form
        onSubmit={form.onSubmit((val) => {
          if (!image || !category) {
            toast.error('Please upload image and select category');
            return;
          }
          const body = {
            name: val.name,
            description: val.description,
            category,
            available: availableProduct,
            hit: hitProduct,
            image,
            price: val.price,
            publish: publishProduct,
          };
          if (ProductData?._id) {
            updateMutation.mutate({
              id: ProductData._id,
              ...body,
            });
            return;
          }
          createMutation.mutate(body);
        })}
      >
        <Card shadow="sm" padding="lg" radius="md" my={8} w={'100%'}>
          <Text fz={'lg'} fw={600}>
            Product info
          </Text>
          <TextInput
            label="Product name"
            placeholder="Enter product name"
            mt="md"
            {...form.getInputProps('name')}
            withAsterisk
          />
          <Select
            label="Product Category"
            placeholder="Category"
            data={categoryArray}
            withinPortal
            mt="md"
            value={category}
            onChange={(e) => e && setCategory(e)}
          />
          <Textarea
            label="Description"
            placeholder="Tell something about product"
            mt="md"
            withAsterisk
            minRows={4}
            {...form.getInputProps('description')}
          />
        </Card>
        <Card shadow="sm" padding="lg" radius="md" my={8} w={'100%'}>
          <Flex justify={'space-between'} my={12}>
            <Text fz={'lg'} fw={600}>
              Product Image
            </Text>
            <Button onClick={() => setImage('')}>Reset Image</Button>
          </Flex>
          <ImageUpload
            image={image}
            setImage={(img: string) => setImage(img)}
          />
        </Card>
        <Card shadow="sm" padding="lg" radius="md" my={8} w={'100%'}>
          <Text fz={'lg'} fw={600}>
            Product price
          </Text>
          <Flex gap={6} w={'100%'} justify="space-between" wrap="wrap">
            <NumberInput
              label="Price"
              placeholder="522"
              mt="md"
              withAsterisk
              {...form.getInputProps('price')}
            />
          </Flex>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" my={8}>
          <Text fz={'lg'} fw={600}>
            Other properties
          </Text>
          <Switch
            label="Show as hit product"
            my={18}
            checked={hitProduct}
            onChange={toggleHitProduct}
          />
          <Switch
            label="Publish"
            my={18}
            checked={publishProduct}
            onChange={togglePublishProduct}
          />
          <Switch
            label="Available"
            my={18}
            checked={availableProduct}
            onChange={toggleAvailableProduct}
          />
        </Card>
        <Flex gap={8} justify="flex-end">
          {ProductData?._id && (
            <Button
              loading={deleteMutation.isLoading}
              onClick={() => {
                deleteMutation.mutate({
                  id: ProductData._id,
                });
              }}
            >
              Delete Product
            </Button>
          )}
          <Button
            type="submit"
            loading={createMutation.isLoading || updateMutation.isLoading}
          >
            {ProductData?._id ? 'Update' : 'Create'}
          </Button>
          <Button variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </Flex>
      </form>
    </Container>
  );
};

export default ManageProduct;
