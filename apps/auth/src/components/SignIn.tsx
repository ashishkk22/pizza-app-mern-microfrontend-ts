import React from 'react';
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Text,
  Anchor,
  Container,
  Box,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { validateSignIn } from '../validations/signin';
import { toast } from 'react-hot-toast';
import { signin } from '../config/api';

const initialValues = {
  email: '',
  credentials: '',
};

const SignIn = () => {
  const form = useForm({
    initialValues,
    validate: (values) => validateSignIn(values),
  });
  const submitFormHandler = async (values: typeof initialValues) => {
    try {
      const { data } = await toast.promise(
        signin({
          email: form.values.email,
          password: form.values.credentials,
        }),
        {
          loading: 'Loading! Please wait....',
          success: <div>SignIn successfully</div>,
          error: <div>Please check the inputs !</div>,
        }
      );
      console.log(data, 'from signin');
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <Box bg="#F5F5F5" mih="100vh">
      <Container size="xs" px="xs" pt={120}>
        <Text fz="xl" ta="center" mt="md" mb={50} weight={500}>
          Welcome Back !{' '}
          <span role="img" aria-label="hey emoji">
            👋
          </span>
        </Text>

        <form onSubmit={form.onSubmit((values) => submitFormHandler(values))}>
          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            {...form.getInputProps('email')}
            size="md"
            mt="md"
            withAsterisk
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            {...form.getInputProps('credentials')}
            mt="md"
            size="md"
            withAsterisk
          />
          <Checkbox
            label="Keep me logged in"
            mt="xl"
            size="md"
            {...form.getInputProps('isLoggedIn')}
          />
          <Button fullWidth mt="xl" size="md" type="submit">
            Sign In
          </Button>
        </form>

        <Text ta="center" mt="md">
          Don&apos;t have an account?{' '}
          <Link to={'/signup'}>
            <Anchor component="button" weight={700}>
              Register
            </Anchor>
          </Link>
        </Text>
      </Container>
    </Box>
  );
};

export default SignIn;
