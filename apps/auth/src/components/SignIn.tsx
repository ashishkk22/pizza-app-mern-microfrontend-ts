import React, { useState } from 'react';
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Text,
  Anchor,
  Container,
  Card,
} from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { validateSignIn } from '../validations/signin';
import { toast } from 'react-hot-toast';
import { signin } from '../config/api';
import { useUserStore } from '@pizza-app/redux-store';

const initialValues = {
  email: '',
  credentials: '',
};

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const { addUser } = useUserStore();

  const navigate = useNavigate();

  const form = useForm({
    initialValues,
    validate: (values) => validateSignIn(values),
  });
  const submitFormHandler = async () => {
    setLoading(true);
    try {
      const { data } = await signin({
        email: form.values.email,
        password: form.values.credentials,
      });
      const payload = {
        name: data.user.name,
        email: data.user.email,
        photo: data.user.photo,
        TOKEN: data.TOKEN,
        isAuth: true,
      };

      addUser(payload);
      localStorage.setItem('TOKEN', data.TOKEN);
      navigate('..');
      toast.success(data.message);
    } catch (error: any) {
      error?.response?.data?.message &&
        toast.error(error?.response?.data?.message);
    }
    setLoading(false);
  };
  return (
    <Container size="xs" px="xs" pt={120}>
      <Card shadow="sm" padding="lg" radius="md" my={8}>
        <Text fz="xl" ta="center" mt="md" mb={50} weight={500}>
          Welcome Back !{' '}
          <span role="img" aria-label="hey emoji">
            👋
          </span>
        </Text>

        <form onSubmit={form.onSubmit(() => submitFormHandler())}>
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
          <Button fullWidth mt="xl" size="md" type="submit" loading={loading}>
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
      </Card>
    </Container>
  );
};

export default SignIn;
