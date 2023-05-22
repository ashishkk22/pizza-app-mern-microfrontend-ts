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

export default function AuthenticationImage() {
  return (
    <Container size="xs" px="xs" mt={120}>
      <Text fz="xl" ta="center" mt="md" mb={50} weight={500}>
        Hi, Welcome to our app !
      </Text>
      <TextInput label="Name" placeholder="John Doe" size="md" />
      <TextInput
        label="Email address"
        placeholder="hello@gmail.com"
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
