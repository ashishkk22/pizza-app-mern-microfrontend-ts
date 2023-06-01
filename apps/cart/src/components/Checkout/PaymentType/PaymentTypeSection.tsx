import { Card, Flex, Radio, Text } from '@mantine/core';
import React, { FC, useState } from 'react';
import PaymentSelectionCard from '../SelectionCard';

type PaymentTypeSectionProps = {
  activeType: (type: string) => void;
};

const typesOfPayment = ['COD'];

const PaymentTypeSection: FC<PaymentTypeSectionProps> = ({ activeType }) => {
  const [active, setActive] = useState<string | undefined>();

  const setActiveAddress = (type: string) => {
    activeType(type);
    setActive(type);
  };

  return (
    <>
      <Text mt={16}>Payment Type</Text>
      <Flex direction="row" gap={'lg'} wrap={'wrap'} mt={16}>
        {typesOfPayment.map((type) => {
          return (
            <PaymentSelectionCard
              key={type}
              isActive={active === type}
              handleActive={() => setActiveAddress(type)}
              paymentType={type}
            />
          );
        })}
      </Flex>
    </>
  );
};

export default PaymentTypeSection;
