import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Anchor,
  Stack,
  Container,
  Title,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import classes from './loginPage.module.css';
import { userService } from '../../service/user.service';

export default function LoginPage() {
  const userSvc = userService;

  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });
  const navigate = useNavigate();

  function handleSubmit(values: { email: string; password: string; }): void {
    userSvc.login(values)
      .then(r => {
        // move to service
        localStorage.setItem('accessToken', r.accessToken);
        navigate("/");
      })
      .catch(e => {
        alert(e.message);
        console.log(e);
      });
  }

  return (
    <Container size={460} my={30}>
      <Title className={classes.title} ta="center">
        Login to Online Mart!
      </Title>
      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="Email"
              placeholder="Enter email"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email && 'Invalid email'}
              radius="md"
            />

            <PasswordInput
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password && 'Password should include at least 6 characters'}
              radius="md"
            />
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor component="button" type="button" c="dimmed" onClick={() => navigate("/register")} size="xs">
              Don't have an account? Register
            </Anchor>
            <Button type="submit" radius="xl">
              LOGIN
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}