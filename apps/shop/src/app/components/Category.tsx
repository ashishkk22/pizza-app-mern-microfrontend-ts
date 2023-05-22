import { Container, Tabs, Title } from '@mantine/core';
import React, { Suspense } from 'react';
import PizzaSection from './CategorySections/pizza/PizzaSection';
import DrinkSection from './CategorySections/drink/DrinkSection';
import SouceSection from './CategorySections/souce/SouceSection';

const Category = () => {
  return (
    <Container py={20}>
      <Tabs
        defaultValue="pizza"
        unstyled
        styles={(theme) => ({
          tab: {
            ...theme.fn.focusStyles(),
            backgroundColor: theme.colors.gray[5],
            color: theme.colors.gray[0],
            padding: `${theme.spacing.xs} ${theme.spacing.md}`,
            marginRight: '8px',
            marginTop: '8px',
            cursor: 'pointer',
            fontSize: theme.fontSizes.sm,
            display: 'flex',
            alignItems: 'center',
            borderRadius: '1rem',
            border: '0',
            '&:disabled': {
              opacity: 0.5,
              cursor: 'not-allowed',
            },
            '&[data-active]': {
              backgroundColor: theme.colors.red[6],
              color: theme.white,
            },
          },
          tabsList: {
            display: 'flex',
            flexWrap: 'wrap',
          },
        })}
      >
        <Tabs.List>
          <Tabs.Tab value="pizza">
            <Title order={6}>Pizza</Title>
          </Tabs.Tab>
          <Tabs.Tab value="drinks">
            <Title order={6}>Drinks</Title>
          </Tabs.Tab>
          <Tabs.Tab value="souces">
            <Title order={6}>Souces</Title>
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="pizza" pt="xs">
          <PizzaSection />
        </Tabs.Panel>

        <Tabs.Panel value="drinks" pt="xs">
          <DrinkSection />
        </Tabs.Panel>

        <Tabs.Panel value="souces" pt="xs">
          <SouceSection />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default Category;
