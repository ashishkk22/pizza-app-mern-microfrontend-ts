import React from 'react';
import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
  rem,
  Container,
} from '@mantine/core';
import { Link } from 'react-router-dom';

const SignIn = () => {
  return (
    <Container size="xs" px="xs" mt={120}>
      <Text fz="xl" ta="center" mt="md" mb={50} weight={500}>
        Welcome Back !
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
