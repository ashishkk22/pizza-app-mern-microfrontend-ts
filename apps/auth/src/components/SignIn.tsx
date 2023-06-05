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
import { addToken } from '@pizza-app/ui-shared';
import { useMediaQuery } from '@mantine/hooks';

const initialValues = {
  email: '',
  credentials: '',
};

const SignIn = () => {
  const [loading, setLoading] = useState(false);

  //to add the current user in the store
  const { addUser } = useUserStore();

  const largeScreen = useMediaQuery('(min-width:600px)');

  const navigate = useNavigate();

  // to handle the form and its validations
  const form = useForm({
    initialValues,
    validate: (values) => validateSignIn(values),
  });

  const platform = localStorage.getItem('host');

  const submitFormHandler = async () => {
    setLoading(true);
    try {
      const { data } = await signin({
        email: form.values.email,
        password: form.values.credentials,
      });
      addUser({
        name: data.user.name,
        email: data.user.email.toLowerCase(),
        photo: data.user.photo,
        TOKEN: data.TOKEN,
        isAuth: true,
      });
      navigate('/');
      addToken(data.TOKEN);
      toast.success('Signed successfully !');
    } catch (error: any) {
      error?.response?.data?.message &&
        toast.error(error?.response?.data?.message);
    }
    setLoading(false);
  };
  return (
    <Container size="xs" px="xs" pt={largeScreen ? 60 : 20}>
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
            autoComplete="on"
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
        {platform !== 'admin' && (
          <Text ta="center" mt="md">
            Don&apos;t have an account?{' '}
            <Link to={'/signup'}>
              <Anchor component="button" weight={700}>
                Register
              </Anchor>
            </Link>
          </Text>
        )}
      </Card>
    </Container>
  );
};

export default SignIn;
