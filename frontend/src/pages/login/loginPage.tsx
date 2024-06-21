import { useForm } from "@mantine/form";
import {
    TextInput,
    PasswordInput,
    Paper,
    Group,
    Button,
    Anchor,
    Stack,
    Container,
    Title,
} from "@mantine/core";
import { useNavigate, useLocation } from "react-router-dom";
import classes from "./loginPage.module.css";
import { userService } from "../../service/user.service";
import { useState } from "react";
import { LoginResponse } from "../../types/user";
import { ErrorPayload } from "../../types/response";
import InputErrors from "../../components/common/form/inputErrors";

export default function LoginPage() {
    const [errors, setErrors] = useState<{ [key: string]: Array<string> }>({});
    const { pathname } = useLocation();

    const navigate = useNavigate();

    const goToRegister = () => {
        if (pathname.includes("/login/seller")) {
            return navigate("/register?client=seller");
        }
        navigate("/register?client=customer");
    };

    const form = useForm({
        initialValues: {
            email: "",
            password: "",
        },
        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
            password: (val) =>
                val.length <= 6
                    ? "Password should include at least 6 characters"
                    : null,
        },
    });

    async function handleSubmit(values: {
        email: string;
        password: string;
    }): Promise<void> {
        const resp = await userService.login(values);

        if (resp.status && resp.data) {
            localStorage.setItem(
                "accessToken",
                (resp.data as LoginResponse).accessToken
            );
            let navigateTo = "/";
            if (resp.data.roles.filter((r) => r.toLowerCase() === "seller"))
                navigateTo += "seller";

            navigate(navigateTo);
        } else {
            if (resp.data) setErrors(resp.data as ErrorPayload);

            alert(resp.message);
        }
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
                            onChange={(event) =>
                                form.setFieldValue(
                                    "email",
                                    event.currentTarget.value
                                )
                            }
                            error={form.errors.email && "Invalid email"}
                            radius="md"
                        />
                        <InputErrors messages={errors["email"]} />

                        <PasswordInput
                            label="Password"
                            placeholder="Your password"
                            value={form.values.password}
                            onChange={(event) =>
                                form.setFieldValue(
                                    "password",
                                    event.currentTarget.value
                                )
                            }
                            error={
                                form.errors.password &&
                                "Password should include at least 6 characters"
                            }
                            radius="md"
                        />
                        <InputErrors messages={errors["password"]} />
                    </Stack>

                    <Group justify="space-between" mt="xl">
                        <Anchor
                            component="button"
                            type="button"
                            c="dimmed"
                            onClick={goToRegister}
                            size="xs"
                        >
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
