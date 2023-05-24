import React from 'react';
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Text,
  Anchor,
  Container,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { useStore } from '@pizza-app/redux-store';
const SignIn = () => {
  const { value, increment, decrement } = useStore();
  console.log(value, 'from the sign in ');
  return (
    <Container size="xs" px="xs" mt={120}>
      <Button onClick={increment}>Counter + : {value}</Button>
      <Button onClick={decrement}>Counter - : {value}</Button>
      <Text fz="xl" ta="center" mt="md" mb={50} weight={500}>
        Welcome Back !{' '}
        <span role="img" aria-label="hey emoji">
          👋
        </span>
      </Text>

      <TextInput
        label="Email address"
        placeholder="hello@gmail.com"
        size="md"
      />
      <PasswordInput
        label="Password"
        placeholder="Your password"
        mt="md"
        size="md"
      />
      <Checkbox label="Keep me logged in" mt="xl" size="md" />
      <Button fullWidth mt="xl" size="md">
        Login
      </Button>

      <Text ta="center" mt="md">
        Don&apos;t have an account?{' '}
        <Link to={'/signup'}>
          <Anchor component="button" weight={700}>
            Register
          </Anchor>
        </Link>
      </Text>
    </Container>
  );
};

export default SignIn;
