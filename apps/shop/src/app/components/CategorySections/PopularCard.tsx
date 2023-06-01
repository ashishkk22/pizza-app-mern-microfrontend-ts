import { Card, Image, Text, Flex, Box } from '@mantine/core';

import React, { FC } from 'react';

type PopularCardProps = {
  imgUrl: string;
  price: number;
};

const PopularCard: FC<PopularCardProps> = ({ imgUrl, price }) => {
  return (
    <Card shadow="sm" padding="xl" component="div" w={280}>
      <Flex gap="md" justify="center" align="center" direction="row">
        <Image src={imgUrl} width={120} alt="Peperoni-1" />
        <Box>
          <Text color="brand.9">Peperoni Pizza</Text>
          <Text color="brand.9" weight={20}>
            ₹ {price}
          </Text>
        </Box>
      </Flex>
    </Card>
  );
};

export default PopularCard;
