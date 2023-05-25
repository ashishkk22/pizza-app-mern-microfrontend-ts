import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Group,
  Text,
  Title,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import AddressSection from './AddressSection';

const Checkout = () => {
  const addressRef = useRef<number | undefined>();
  console.log(addressRef.current);
  const logref = () => {
    console.log(addressRef.current);
  };
  return (
    <Container>
      <Title color="brand.9" order={3} py={24}>
        Checkout
      </Title>

      <Flex
        justify="space-between"
        align="center"
        direction="row"
        w={'100%'}
        wrap="wrap"
      >
        <Flex direction="column" justify="center">
          <Box>
            <Text>Address</Text>
            <Flex
              direction="row"
              gap={'lg'}
              wrap={'wrap'}
              justify={'center'}
              mt={16}
            >
              <AddressSection />
              {/* <AddressCard
                isActive
                name="Ashish Kachhadiya"
                address="Lorem ipsum dolor sit amet consectetur adipisicing elit. Non iste
        corrupti ipsa Lorem ipsum dolor sit amet."
              />
              <AddressCard
                name="Ashish Kachhadiya"
                address="Lorem ipsum dolor sit amet consectetur adipisicing elit. Non iste
        corrupti ipsa Lorem ipsum dolor sit amet."
              />
              <AddressCard
                name="Ashish Kachhadiya"
                address="Lorem ipsum dolor sit amet consectetur adipisicing elit. Non iste
        corrupti ipsa Lorem ipsum dolor sit amet."
              />
              <AddressCard
                name="Ashish Kachhadiya"
                address="Lorem ipsum dolor sit amet consectetur adipisicing elit. Non iste
        corrupti ipsa Lorem ipsum dolor sit amet."
              />
              <AddressCard
                name="Ashish Kachhadiya"
                address="Lorem ipsum dolor sit amet consectetur adipisicing elit. Non iste
        corrupti ipsa Lorem ipsum dolor sit amet."
              />
              <AddressCard
                name="Ashish Kachhadiya"
                address="Lorem ipsum dolor sit amet consectetur adipisicing elit. Non iste
        corrupti ipsa Lorem ipsum dolor sit amet."
              />
              <AddressCard
                name="Ashish Kachhadiya"
                address="Lorem ipsum dolor sit amet consectetur adipisicing elit. Non iste
        corrupti ipsa Lorem ipsum dolor sit amet."
              /> */}
            </Flex>
          </Box>
        </Flex>
      </Flex>
      <Button onClick={logref}>Check the ref</Button>
    </Container>
  );
};

export default Checkout;
