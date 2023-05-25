import React from 'react';
import { Box, Button, Divider, Flex, Group, Image, Text } from '@mantine/core';

const ShoppingCard = () => {
  return (
    <>
      <Flex justify="space-between" align="center" direction="row" w={'100%'}>
        <Group align="center">
          <Image
            src="https://ik.imagekit.io/ashishkk22/pizza-banner.svg?updatedAt=1684733181767"
            width={110}
          />
          <Box>
            <Text color="brand.9" fw={600} mb={7} fz="lg">
              Pepperoni Pizza
            </Text>
            <Text fz="xs" my={7} color="brand.9" fw={500}>
              Large | Thick
            </Text>
            <Group>
              <Button
                compact
                uppercase
                variant="outline"
                size="xs"
                fz="xl"
                color="brand.7"
              >
                +
              </Button>
              <Text fz="md" color="brand.9">
                22
              </Text>
              <Button
                compact
                uppercase
                variant="outline"
                size="xs"
                fz="xl"
                color="brand.7"
              >
                -
              </Button>
            </Group>
          </Box>
        </Group>

        <Group>
          <Text color="brand.9" weight={600}>
            ₹399
          </Text>
        </Group>
      </Flex>
      <Divider size="xs" color="gray.2" my={16} />
    </>
  );
};

export default ShoppingCard;
