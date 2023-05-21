import { Card, Image, Text, Flex, Box } from '@mantine/core';

import React, { FC } from 'react';

type PopularCardProps = {
  imgUrl: string;
};

const PopularCard: FC<PopularCardProps> = ({ imgUrl }) => {
  return (
    <Card shadow="sm" padding="xl" component="div" w={280}>
      <Flex gap="md" justify="center" align="center" direction="row">
        <Image src={imgUrl} width={120} alt="Peperoni-1" />
        <Box>
          <Text color="brand.9">Peperoni adsfasd asdf </Text>
          <Text color="brand.9" weight={20}>
            ₹ 500
          </Text>
        </Box>
      </Flex>
    </Card>
  );
};

export default PopularCard;
