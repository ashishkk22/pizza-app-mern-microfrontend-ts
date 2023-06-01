import {
  Button,
  Container,
  NumberInput,
  Switch,
  TextInput,
} from '@mantine/core';
import React, { FC, useReducer } from 'react';
import { useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import {
  CreateCouponBody,
  DeleteCouponBody,
  UpdateCouponBody,
} from '../../utils/endPoint.type';
import { createCoupon, deleteCoupon, updateCoupon } from '../../utils/api';
import { toast } from 'react-hot-toast';
import queryClient from '../../utils/client';
import { IconTrash } from '@tabler/icons-react';

type AddPromoProps = {
  closeModel: () => void;
  totalPage: number | undefined;
  currentCoupon: {
    name: string;
    id: string;
    percentage: number;
    status: string;
  };
  currentPage: number;
};

//getting closeModal and tatalPage so that we can invalidate the last page only any we don't have to refetch all the pages
const ManagePromo: FC<AddPromoProps> = ({
  closeModel,
  totalPage,
  currentCoupon,
  currentPage,
}) => {
  //to check status from prop and then set the status
  let couponStatus = true;
  if (currentCoupon?.status === 'draft') {
    couponStatus = false;
  }
  const [checked, toggleChecked] = useReducer((state) => !state, couponStatus);

  const form = useForm({
    initialValues: {
      coupon: currentCoupon.name ?? '',
      percentage: currentCoupon.percentage ?? 0,
    },
    validate: {
      coupon: (val) =>
        val.length <= 2 ? 'Please enter the valid coupon name!' : null,
      percentage: (val) =>
        val < 100 && val > 0 ? null : 'Enter the valid percentage',
    },
  });

  //to create the coupon
  const createMutation = useMutation({
    mutationFn: (body: CreateCouponBody) => createCoupon(body),
    onError: () => {
      toast.error('Create coupon failed ! give unique id');
    },
    onSuccess: () => {
      //invalidate the last page
      queryClient.invalidateQueries({
        queryKey: ['coupons', totalPage],
      });
      if (currentPage === 1) {
        queryClient.invalidateQueries({
          queryKey: ['coupons'],
        });
      }
      closeModel();
      toast.success('Coupon Created successfully !');
    },
  });

  //to update the coupon
  const updateMutation = useMutation({
    mutationFn: (body: UpdateCouponBody) => updateCoupon(body),
    onError: () => {
      toast.error('Coupon update failed !');
    },
    onSuccess: () => {
      //invalidate the current page
      queryClient.invalidateQueries({
        queryKey: ['coupons', currentPage],
      });
      closeModel?.();
      toast.success('Coupon updated successfully !');
    },
  });

  //to delete the coupon
  const deleteMutation = useMutation({
    mutationFn: (body: DeleteCouponBody) => deleteCoupon(body),
    onError: () => {
      toast.error('Coupon delete failed');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['coupons'],
      });
      closeModel?.();
      toast.success('Coupon deleted successfully');
    },
  });

  return (
    <Container size="xs" px="xs">
      <form
        onSubmit={form.onSubmit((val) => {
          const status = checked ? 'valid' : 'draft';
          if (currentCoupon?.id) {
            updateMutation.mutate({
              updatedName: val.coupon,
              updatedStatus: status,
              couponId: currentCoupon.id,
              updatedPercentage: val.percentage,
            });
          } else {
            createMutation.mutate({
              couponName: val.coupon,
              percentage: val.percentage,
              status,
            });
          }
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
        <NumberInput
          label="Coupon off Percentage"
          placeholder="Coupon off Percentage"
          size="md"
          mt="md"
          withAsterisk
          {...form.getInputProps('percentage')}
        />
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
          {currentCoupon.id ? 'Update Coupon' : 'Add Coupon'}
        </Button>
        {currentCoupon.id && (
          <Button
            variant="subtle"
            leftIcon={<IconTrash />}
            fullWidth
            mt="sm"
            size="md"
            loading={deleteMutation.isLoading}
            onClick={() =>
              deleteMutation.mutate({ couponId: currentCoupon.id })
            }
          >
            Delete Coupon
          </Button>
        )}
      </form>
    </Container>
  );
};

export default ManagePromo;
