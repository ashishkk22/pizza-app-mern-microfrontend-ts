import React from 'react';
import { Container, Flex } from '@mantine/core';
import DrinkCard from './DrinkCard';
import { useCartReducer } from '@pizza-app/redux-store';
import { toast } from 'react-hot-toast';

const DrinkCardData = [
  {
    id: 'asdfew',
    image: 'https://ik.imagekit.io/ashishkk22/juice-orange.svg',
    name: 'Margheritta pizza',
    description:
      'Juicy chicken fillet and crispy bacon combined with signature tomatosauce, Mozzarella and onions',
    price: 500,
  },
  {
    id: 'asasdewdfew',
    image: 'https://ik.imagekit.io/ashishkk22/juice-orange.svg',
    name: 'Margheritta pizza',
    description:
      'Juicy chicken fillet and crispy bacon combined with signature tomatosauce, Mozzarella and onions',
    price: 500,
  },
  {
    id: 'asdqweffdfew',
    image: 'https://ik.imagekit.io/ashishkk22/juice-orange.svg',
    name: 'Margheritta pizza',
    description:
      'Juicy chicken fillet and crispy bacon combined with signature tomatosauce, Mozzarella and onions',
    price: 500,
  },
  {
    id: 'asd21fdewfew',
    image: 'https://ik.imagekit.io/ashishkk22/juice-orange.svg',
    name: 'Margheritta pizza',
    description:
      'Juicy chicken fillet and crispy bacon combined with signature tomatosauce, Mozzarella and onions',
    price: 500,
  },
  {
    id: 'as23r3f32rdfew',
    image: 'https://ik.imagekit.io/ashishkk22/juice-orange.svg',
    name: 'Margheritta pizza',
    description:
      'Juicy chicken fillet and crispy bacon combined with signature tomatosauce, Mozzarella and onions',
    price: 500,
  },
  {
    id: 'asdfw324faerew',
    image: 'https://ik.imagekit.io/ashishkk22/juice-orange.svg',
    name: 'Margheritta pizza',
    description:
      'Juicy chicken fillet and crispy bacon combined with signature tomatosauce, Mozzarella and onions',
    price: 500,
  },
  {
    id: 'asdfw3223fased4faerew',
    image: 'https://ik.imagekit.io/ashishkk22/juice-orange.svg',
    name: 'Margheritta pizza',
    description:
      'Juicy chicken fillet and crispy bacon combined with signature tomatosauce, Mozzarella and onions',
    price: 500,
  },
  {
    id: 'asdfw3223faser2qfased4faerew',
    image: 'https://ik.imagekit.io/ashishkk22/juice-orange.svg',
    name: 'Margheritta pizza',
    description:
      'Juicy chicken fillet and crispy bacon combined with signature tomatosauce, Mozzarella and onions',
    price: 500,
  },
];

const DrinkSection = () => {
  const { addToCart } = useCartReducer();
  return (
    <Container py={16}>
      <Flex
        // mih={50}
        gap="md"
        justify="center"
        align="center"
        direction="row"
        wrap="wrap"
      >
        {DrinkCardData.map((data) => {
          return (
            <DrinkCard
              key={data.id}
              name={data.name}
              image={data.image}
              description={data.description}
              onClick={() => addToCart(data)}
              price={data.price}
            />
          );
        })}
      </Flex>
    </Container>
  );
};

export default DrinkSection;
