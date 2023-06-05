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
import { useMediaQuery } from '@mantine/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
import ImageUpload from './ImageUpload';
import { useReducer, useState } from 'react';
import { validateSignUp } from '../validations/signup';
import { signup, verifyOtp } from '../config/api';
import { toast } from 'react-hot-toast';
import { useUserStore } from '@pizza-app/redux-store';
import { addToken } from '@pizza-app/ui-shared';

const initialValues = {
  name: '',
  email: '',
  credentials: '',
  confirmCredentials: '',
  isLoggedIn: false,
  otp: '',
};

const SignUp = () => {
  const [loading, setLoading] = useState(false);

  //to get the image if uploaded (imageKit)
  const [image, setImage] = useState('https://robohash.org/pizza');

  //to open the otp field and remove the password field
  const [isOtpSend, toggler] = useReducer((state) => !state, false);

  //to save the otp hash
  const [otpHash, setOtpHash] = useState('');

  //to add the current user in the redux
  const { addUser } = useUserStore();

  const largeScreen = useMediaQuery('(min-width:600px)');

  //to validate the form and get the form values
  const form = useForm({
    initialValues,
    validate: (values) => validateSignUp(values, isOtpSend),
  });

  //to navigate from this page
  const navigate = useNavigate();

  //to send the otp and verify it
  const submitFormHandler = async (values: typeof initialValues) => {
    setLoading(true);
    if (!isOtpSend) {
      try {
        const { data } = await signup({
          name: values.name,
          email: values.email.toLowerCase(),
          password: values.credentials,
          photo: image,
        });
        toast.success('Otp sended successfully !');
        setOtpHash(data.hash);
        toggler();
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
      }
    } else {
      try {
        const { data } = await toast.promise(
          verifyOtp({
            email: values.email,
            hash: otpHash,
            otp: values.otp,
          }),
          {
            loading: 'Verifying otp.....',
            success: <div>Verified ! Signup successfully</div>,
            error: <div>Please enter valid otp</div>,
          }
        );
        navigate('/');
        addUser({
          name: data.user.name,
          email: data.user.email.toLowerCase(),
          photo: data.user.photo,
          TOKEN: data.TOKEN,
          isAuth: true,
        });
        addToken(data.TOKEN);
      } catch (error: any) {
        return;
      }
    }
    setLoading(false);
  };

  return (
    <Container size="xs" px="xs" pt={largeScreen ? 60 : 20}>
      <Card shadow="sm" padding="lg" radius="md" my={8}>
        <ImageUpload image={image} setImage={(url) => setImage(url)} />
        <form onSubmit={form.onSubmit((values) => submitFormHandler(values))}>
          <TextInput
            label="Name"
            placeholder="John Doe"
            size="md"
            withAsterisk
            {...form.getInputProps('name')}
            disabled={isOtpSend}
          />
          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            {...form.getInputProps('email')}
            size="md"
            mt="md"
            withAsterisk
            disabled={isOtpSend}
          />
          {!isOtpSend && (
            <>
              <PasswordInput
                label="Password"
                placeholder="Your password"
                {...form.getInputProps('credentials')}
                mt="md"
                size="md"
                withAsterisk
                disabled={isOtpSend}
              />
              <PasswordInput
                label="Confirm Password"
                placeholder="Your confirm password"
                mt="md"
                size="md"
                {...form.getInputProps('confirmCredentials')}
                withAsterisk
                disabled={isOtpSend}
              />
            </>
          )}
          {isOtpSend && (
            <PasswordInput
              label="Enter otp"
              placeholder="Your unique otp"
              mt="md"
              description="Enter the 6 digit otp that has been sended to the provided email id!"
              size="md"
              {...form.getInputProps('otp')}
              withAsterisk
            />
          )}
          <Checkbox
            label="Keep me logged in"
            mt="xl"
            size="md"
            {...form.getInputProps('isLoggedIn')}
          />
          <Button fullWidth mt="xl" size="md" type="submit" loading={loading}>
            {isOtpSend ? 'Sign Up' : 'Send Otp'}
          </Button>
        </form>
        <Text ta="center" mt="md">
          Don&apos;t have an account?{' '}
          <Link to={'/signin'}>
            <Anchor component="button" weight={700}>
              Login
            </Anchor>
          </Link>
        </Text>
      </Card>
    </Container>
  );
};

export default SignUp;
