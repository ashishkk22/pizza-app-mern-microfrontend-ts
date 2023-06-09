import React, { FC } from 'react';
import { Box, Button, Divider, Flex, Group, Image, Text } from '@mantine/core';

type ShoppingCardProps = {
  image: string;
  name: string;
  // type:true,
  price: number;
  qty: number | null | undefined;
  increaseQty: () => void;
  decreaseQty: () => void;
};

const ShoppingCard: FC<ShoppingCardProps> = ({
  image,
  name,
  price,
  qty = 1,
  increaseQty,
  decreaseQty,
}) => {
  return (
    <>
      <Flex justify="space-between" align="center" direction="row" w={'100%'}>
        <Group align="center">
          <Image src={image} width={110} />
          <Box>
            <Text color="brand.9" fw={600} mb={7} fz="lg">
              {name}
            </Text>
            <Group mt={7}>
              <Button
                compact
                uppercase
                variant="outline"
                size="xs"
                fz="xl"
                color="brand.7"
                onClick={decreaseQty}
              >
                -
              </Button>
              <Text fz="md" color="brand.9">
                {qty}
              </Text>
              <Button
                compact
                uppercase
                variant="outline"
                size="xs"
                fz="xl"
                color="brand.7"
                onClick={increaseQty}
              >
                +
              </Button>
            </Group>
          </Box>
        </Group>

        <Group>
          <Text color="brand.9" weight={600}>
            ₹{price}
          </Text>
        </Group>
      </Flex>
      <Divider size="xs" color="gray.2" my={16} />
    </>
  );
};

export default ShoppingCard;
