import {
    Paper,
    Title,
    TextInput,
    Button,
    Container,
    Group,
    Anchor,
    Stack,
    SegmentedControl,
    PasswordInput,
} from "@mantine/core";
import classes from "./registerPage.module.css";
import { useForm } from "@mantine/form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { userService } from "../../service/user.service";
import { UserSessionContext } from "../../context/UserSession";
import { useContext } from "react";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const { isLoggedIn } = useContext(UserSessionContext);

    if (isLoggedIn) {
        navigate("/");
    }

    const form = useForm({
        initialValues: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
        },
        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
            password: (val) =>
                val.length <= 6
                    ? "Password should include at least 6 characters"
                    : null,
            firstName: (val) => (val.length ? null : "First name required"),
            lastName: (val) => (val.length ? null : "Last name required"),
        },
    });

    async function handleSubmit(values: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
    }): Promise<void> {
        const resp = await userService.register(values);

        if (resp.success && resp.data) {
            goToLogin();
        } else {
            console.log({ resp });
        }
    }

    const goToLogin = () => {
        if (searchParams.get("client") === "seller") {
            return navigate("/login?client=seller");
        }
        navigate("/login?client=customer");
    };

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
                            onChange={(event) =>
                                form.setFieldValue(
                                    "firstName",
                                    event.currentTarget.value
                                )
                            }
                            radius="md"
                            error={form.errors.firstName}
                        />
                        <TextInput
                            label="Last name"
                            placeholder="Enter last name"
                            value={form.values.lastName}
                            onChange={(event) =>
                                form.setFieldValue(
                                    "lastName",
                                    event.currentTarget.value
                                )
                            }
                            radius="md"
                            error={form.errors.lastName}
                        />
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
                            radius="md"
                            error={form.errors.email}
                        />
                        <PasswordInput
                            label="Password"
                            placeholder="Enter password"
                            value={form.values.password}
                            onChange={(event) =>
                                form.setFieldValue(
                                    "password",
                                    event.currentTarget.value
                                )
                            }
                            radius="md"
                            error={form.errors.password}
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
                                label: "Register as Customer",
                            },
                            { value: "seller", label: "Register as Seller" },
                        ]}
                        classNames={classes}
                        onChange={(data) => {
                            setSearchParams(`client=${data}`);
                        }}
                    />
                    <Group justify="space-between" mt="xl">
                        <Anchor
                            component="button"
                            type="button"
                            c="dimmed"
                            onClick={goToLogin}
                            size="xs"
                        >
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
