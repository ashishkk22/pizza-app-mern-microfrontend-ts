import { Button, Container, Flex, Text, Title } from '@mantine/core';
import React from 'react';
import ShoppingCard from './ShoppingCard';
import { Link } from 'react-router-dom';
import { useCartReducer, useCartStore } from '@pizza-app/redux-store';
import EmptyCart from './EmptyCart';

const PopularOrder = () => {
  const { totalPrice, items } = useCartStore();
  const { addToCart, decreaseCart } = useCartReducer();

  if (items.length <= 0) {
    return <EmptyCart />;
  }

  return (
    <Container py={40}>
      <Title color="brand.9" order={3} py={24}>
        Shopping Cart
      </Title>
      {items.map((item) => {
        return (
          <ShoppingCard
            key={item.id}
            image={item.image}
            name={item.name}
            price={item.price}
            qty={item.qty}
            increaseQty={() => addToCart(item)}
            decreaseQty={() => decreaseCart(item)}
          />
        );
      })}
      <Flex justify="space-between" align="center" direction="row" w={'100%'}>
        <Text color="brand.9" weight={600} fz="lg">
          Subtotal
        </Text>
        <Text color="brand.9" weight={600} fz="lg">
          ₹{totalPrice}
        </Text>
      </Flex>
      <Flex justify="flex-end" my={10}>
        <Link to="/checkout">
          <Button mt={22} size="md">
            Order now
          </Button>
        </Link>
      </Flex>
    </Container>
  );
};

export default PopularOrder;
