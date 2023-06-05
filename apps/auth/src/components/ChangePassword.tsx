import { PasswordInput, Button, Container, Card } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { toast } from 'react-hot-toast';
import { validateChangePass } from '../validations/changePassword';
import { changePass } from '../config/api';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  oldCredential: '',
  newCredential: '',
  confirmNewCredential: '',
};

const ChangePassword = () => {
  const largeScreen = useMediaQuery('(min-width:600px)');

  //to navigate
  const navigate = useNavigate();

  //to handle the form and field validation
  const form = useForm({
    initialValues,
    validate: (values) => validateChangePass(values),
  });
  const submitFormHandler = async (values: typeof initialValues) => {
    try {
      const data = await changePass({
        newPassword: values.confirmNewCredential,
        oldPassword: values.oldCredential,
      });
      toast.success('Password changed successfully');
      form.reset();
      navigate('/');
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <Container size="xs" px="xs" pt={largeScreen ? 60 : 20}>
      <Card shadow="sm" padding="lg" radius="md" my={8}>
        <form onSubmit={form.onSubmit((values) => submitFormHandler(values))}>
          <PasswordInput
            label="Old password"
            placeholder="Enter your old password"
            {...form.getInputProps('oldCredential')}
            mt="md"
            size="md"
            withAsterisk
          />
          <PasswordInput
            label="New Password"
            placeholder="Enter new Password"
            {...form.getInputProps('newCredential')}
            mt="md"
            size="md"
            withAsterisk
          />
          <PasswordInput
            label="Confirm New Password"
            placeholder="Your confirm password"
            mt="md"
            size="md"
            {...form.getInputProps('confirmNewCredential')}
            withAsterisk
          />
          <Button fullWidth mt="xl" size="md" type="submit">
            Change Password
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default ChangePassword;
