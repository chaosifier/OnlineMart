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
import { useContext, useState } from "react";
import { LoginResponse } from "../../types/user";
import { ErrorPayload } from "../../types/response";
import InputErrors from "../../components/common/form/inputErrors";
import { UserSessionContext, addUserSession } from "../../context/UserSession";

export default function LoginPage() {
    const [errors, setErrors] = useState<{ [key: string]: Array<string> }>({});
    const { pathname } = useLocation();
    const { dispatch, isLoggedIn } = useContext(UserSessionContext);
    const navigate = useNavigate();

    if (isLoggedIn) {
        navigate("/");
    }

    const isSeller = pathname.includes("/login/seller");

    const goToRegister = () => {
        if (isSeller) {
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
        const payload = {
            ...values,
            registrationType: "CUSTOMER",
        };

        if (isSeller) {
            payload["registrationType"] = "SELLER";
        }
        const resp = await userService.login(payload);

        if (resp.success && resp.data) {
            const payload = resp.data as LoginResponse;
            addUserSession(dispatch, {
                access_token: payload.access_token,
                refresh_token: payload.refresh_token,
                user: payload.userData,
            });
            localStorage.setItem(
                "accessToken",
                (resp.data as LoginResponse).access_token
            );
            localStorage.setItem(
                "refreshToken",
                (resp.data as LoginResponse).refresh_token
            );

            if (isSeller) {
                navigate("/seller/products");
            } else {
                navigate("/");
            }
        } else {
            if (resp.data) setErrors(resp.data as ErrorPayload);
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
