import React from 'react';
import {
  BackgroundImage,
  Box,
  Container,
  Flex,
  Text,
  Title,
  Button,
  Image,
} from '@mantine/core';

const Banner = () => {
  return (
    <BackgroundImage src="https://ik.imagekit.io/ashishkk22/banner-bg.svg?updatedAt=1684732991188">
      <Container py={64}>
        <Flex
          direction={{ base: 'column', sm: 'row' }}
          gap={{ base: 'sm', sm: 'lg' }}
          justify={{ sm: 'space-between' }}
          align={{ base: 'center' }}
        >
          <Box>
            <Text m={4} fs="italic">
              Are you hungry ?
            </Text>
            <Title order={1} color="brand.9" m={4}>
              Get a yummy pizza in 30 min!
            </Title>
            <Button radius="lg" m={4} color="red.6">
              Order now
            </Button>
          </Box>
          <Box>
            <Image
              maw={420}
              mx="auto"
              radius="md"
              src="https://ik.imagekit.io/ashishkk22/pizza-banner.svg?updatedAt=1684733181767"
              alt="banner pizza"
            />
          </Box>
        </Flex>
      </Container>
    </BackgroundImage>
  );
};

export default Banner;
