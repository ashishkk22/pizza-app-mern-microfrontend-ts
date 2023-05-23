import {
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Text,
  Anchor,
  Container,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import { useForm } from '@mantine/form';
import ImageUpload from './ImageUpload';
import { useState } from 'react';

export default function AuthenticationImage() {
  const [image, setImage] = useState('https://robohash.org/pizza-appa');
  const largeScreen = useMediaQuery('(min-width:600px)');
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      terms: true,
    },
    validate: {
      email: (val) =>
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(val)
          ? null
          : 'Invalid email',
      password: (val) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(val)
          ? 'Password must contain 8 characters, One uppercase, One lowercase, One number and One special case character'
          : null,
    },
  });
  return (
    <Container size="xs" px="xs" mt={largeScreen ? 60 : 20}>
      <ImageUpload image={image} setImage={(url) => setImage(url)} />
      <TextInput label="Name" placeholder="John Doe" size="md" />
      <TextInput
        label="Email address"
        placeholder="hello@gmail.com"
        value={form.values.email}
        onChange={(event) =>
          form.setFieldValue('email', event.currentTarget.value)
        }
        error={form.errors.email && 'Invalid email'}
        size="md"
        mt="md"
      />
      <PasswordInput
        label="Password"
        placeholder="Your password"
        mt="md"
        size="md"
      />
      <PasswordInput
        label="Confirm Password"
        placeholder="Your confirm password"
        mt="md"
        size="md"
      />
      <Checkbox label="Keep me logged in" mt="xl" size="md" />
      <Button fullWidth mt="xl" size="md">
        Sign Up
      </Button>

      <Text ta="center" mt="md">
        Don&apos;t have an account?{' '}
        <Link to={'/signin'}>
          <Anchor component="button" weight={700}>
            Login
          </Anchor>
        </Link>
      </Text>
    </Container>
  );
}
