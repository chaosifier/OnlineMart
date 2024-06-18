import {
  Paper,
  Title,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Stack,
} from '@mantine/core';
import classes from './registerPage.module.css';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../service/user.service';

export default function RegisterPage() {
  const userSvc = userService;
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
      firstName: (val) => (val.length ? null : 'First name required'),
      lastName: (val) => (val.length ? null : 'Last name required'),
    },
  });

  function handleSubmit(values: { email: string; password: string; firstName: string; lastName: string; }): void {
    userSvc.register(values)
      .then(() => {
        navigate("/login");
      })
      .catch(e => {
        alert(e.message);
        console.log(e);
      });
  }

  return (
    <Container size={460} my={30}>
      <Title className={classes.title} ta="center">
        Register to Online Mart!
      </Title>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="First name"
              placeholder="Enter first name"
              value={form.values.firstName}
              onChange={(event) => form.setFieldValue('firstName', event.currentTarget.value)}
              radius="md"
              error={form.errors.firstName}
            />
            <TextInput
              label="Last name"
              placeholder="Enter last name"
              value={form.values.lastName}
              onChange={(event) => form.setFieldValue('lastName', event.currentTarget.value)}
              radius="md"
              error={form.errors.lastName}
            />
            <TextInput
              label="Email"
              placeholder="Enter email"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              radius="md"
              error={form.errors.email}
            />
            <TextInput
              label="Password"
              placeholder="Enter password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              radius="md"
              error={form.errors.password}
            />
          </Stack>
          <Group justify="space-between" mt="xl">
            <Anchor component="button" type="button" c="dimmed" onClick={() => navigate("/login")} size="xs">
              Already have an account? Login
            </Anchor>
            <Button type="submit" radius="xl">
              Register
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}