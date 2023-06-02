import { Button, Flex, Select, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { getCoupons } from '../../../utils/api';
import React, { useState } from 'react';
import { useCartReducer } from '@pizza-app/redux-store';
import { toast } from 'react-hot-toast';

const CouponSection = () => {
  const [selectedCoupon, setSelectedCoupon] = useState<number>(0);

  const { applyDiscount } = useCartReducer();

  //to fetch the data based on the page
  const { data, error } = useQuery(['coupons'], () => getCoupons(), {
    keepPreviousData: true,
  });

  const couponData = data?.data.coupons.map((coupon) => {
    return { value: String(coupon.percentage), label: coupon.name };
  });

  const handleCouponApply = () => {
    // setIsApplied(true);
    applyDiscount({ totalDiscount: selectedCoupon });
    toast.success('coupon applied successfully !');
  };

  if (error) return null;
  return (
    <>
      <Text my={20}>Coupon</Text>
      <Flex my={20}>
        {couponData && (
          <Select
            placeholder="Coupon code"
            onChange={(val) => setSelectedCoupon(Number(val))}
            searchable
            nothingFound="No options"
            data={couponData}
            w={'100%'}
            size="md"
          />
        )}
        <Button ml={12} size="md" onClick={handleCouponApply}>
          APPLY
        </Button>
      </Flex>
    </>
  );
};

export default CouponSection;
