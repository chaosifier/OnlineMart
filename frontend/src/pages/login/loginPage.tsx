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
    SegmentedControl,
    Flex,
    rem,
} from "@mantine/core";
import { useNavigate, useSearchParams } from "react-router-dom";
import classes from "./loginPage.module.css";
import { userService } from "../../service/user.service";
import { useContext, useEffect, useState } from "react";
import { LoginResponse, USER_ROLES } from "../../types/user";
import { UserSessionContext, addUserSession } from "../../context/UserSession";

export default function LoginPage() {
    const [loginError, setLoginError] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const { dispatch, isLoggedIn, user } = useContext(UserSessionContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn && user && user?.roles?.[0].slug === USER_ROLES.SELLER) {
            return navigate("/seller/products");
        }
        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn]);

    const goToRegister = () => {
        if (searchParams.get("client") === "seller") {
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
                val.length <= 4
                    ? "Password should include at least 4 characters"
                    : null,
        },
    });

    async function handleSubmit(): Promise<void> {
        if (form.validate().hasErrors) {
            return;
        }
        const payload = {
            ...form.getValues(),
            registrationType: USER_ROLES.CUSTOMER,
        };

        if (searchParams.get("client") === "seller") {
            payload["registrationType"] = USER_ROLES.SELLER;
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

            if (searchParams.get("client") === "seller") {
                navigate("/seller/products");
            } else {
                navigate("/");
            }
        } else {
            setLoginError(true);
        }
    }

    return (
        <Container size={460} my={30}>
            <Title className={classes.title} ta="center">
                Login to Online Mart!
            </Title>
            <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
                <Stack>
                    <TextInput
                        label="Email"
                        placeholder="Enter email"
                        value={form.values.email}
                        radius="md"
                        key={form.key("email")}
                        {...form.getInputProps("email")}
                    />

                    <PasswordInput
                        label="Password"
                        placeholder="Your password"
                        value={form.values.password}
                        radius="md"
                        key={form.key("password")}
                        {...form.getInputProps("password")}
                    />
                </Stack>

                <SegmentedControl
                    radius="xl"
                    size="md"
                    mt={20}
                    defaultValue={searchParams.get("client") ?? "customer"}
                    data={[
                        {
                            value: "customer",
                            label: "Login as Customer",
                        },
                        { value: "seller", label: "Login as Seller" },
                    ]}
                    classNames={classes}
                    onChange={(data) => {
                        setSearchParams(`client=${data}`);
                    }}
                />

                {loginError && (
                    <Flex justify={"center"} mt={rem(10)}>
                        <span style={{ color: "var(--mantine-color-error)" }}>
                            Invalid Credentials
                        </span>
                    </Flex>
                )}

                <Group justify="space-between" mt="md">
                    <Anchor
                        component="button"
                        type="button"
                        c="dimmed"
                        onClick={goToRegister}
                        size="xs"
                    >
                        Don't have an account? Register
                    </Anchor>
                    <Button onClick={handleSubmit} radius="xl">
                        LOGIN
                    </Button>
                </Group>
            </Paper>
        </Container>
    );
}
