import { useContext, useState } from "react";
import {
    Stepper,
    Button,
    Group,
    Container,
    Text,
    Stack,
    SimpleGrid,
    Title,
    TextInput,
    Center,
    Flex,
    Divider,
    Card,
    Grid,
    UnstyledButton,
} from "@mantine/core";
import { ProductCard } from "../product/card/productCard";
import { Product } from "../../types/product";
import classes from "./checkoutPage.module.css";
import { CartSessionContext } from "../../context/cart";
import { CartItemCard } from "../cart/card/cartItemCard";
import { UserSessionContext } from "../../context/UserSession";

export default function CheckoutPage() {
    const { cart, dispatch } = useContext(CartSessionContext);
    const [active, setActive] = useState(0);
    const [selectedPaymentId, setSelectedPaymentId] = useState(0);
    const { user } = useContext(UserSessionContext);
    const nextStep = () =>
        setActive((current) => (current < 4 ? current + 1 : current));
    const prevStep = () =>
        setActive((current) => (current > 0 ? current - 1 : current));

    const paymentOptions = [
        {
            id: 1,
            type: "paypal",
            name: "PayPal",
            description: "PayPal instant payment",
        },
        {
            id: 2,
            type: "zelle",
            name: "Zelle",
            description: "Zelle real-time transfer",
        },
        {
            id: 3,
            type: "credit-card",
            name: "Credit Card",
            description: "Pay with visa card",
        },
    ];

    return (
        <Container>
            <Stepper active={active} onStepClick={setActive}>
                <Stepper.Step label="Review" description="Review products">
                    <Container p={15}>
                        <Text mb={15}>
                            Please review the products you're checking out:
                        </Text>
                        <SimpleGrid spacing={"xl"} cols={3}>
                            {cart &&
                                cart.items &&
                                cart.items.map((itm, i) => (
                                    <CartItemCard key={i} data={itm} />
                                ))}
                        </SimpleGrid>
                    </Container>
                </Stepper.Step>
                <Stepper.Step
                    label="Delivery Loation"
                    description="Confirm address"
                >
                    <Container p={15}>
                        <Text mb={15}>Please verify the delivery address:</Text>
                        <Stack align="center">
                            <div className={classes.form}>
                                <TextInput
                                    label="Email"
                                    placeholder="Enter email"
                                    value={user?.email}
                                    required
                                    classNames={{
                                        input: classes.input,
                                        label: classes.inputLabel,
                                    }}
                                />
                                <TextInput
                                    label="First name"
                                    placeholder="Enter first name"
                                    value={user?.firstName}
                                    mt="md"
                                    classNames={{
                                        input: classes.input,
                                        label: classes.inputLabel,
                                    }}
                                />
                                <TextInput
                                    label="Last name"
                                    placeholder="Enter last name"
                                    value={user?.lastName}
                                    mt="md"
                                    classNames={{
                                        input: classes.input,
                                        label: classes.inputLabel,
                                    }}
                                />
                                <TextInput
                                    label="Phone"
                                    placeholder="Enter phone number"
                                    mt="md"
                                    classNames={{
                                        input: classes.input,
                                        label: classes.inputLabel,
                                    }}
                                />
                                <TextInput
                                    label="Address"
                                    placeholder="Enter delivery address"
                                    mt="md"
                                    classNames={{
                                        input: classes.input,
                                        label: classes.inputLabel,
                                    }}
                                />
                            </div>
                        </Stack>
                    </Container>
                </Stepper.Step>
                <Stepper.Step
                    label="Payment"
                    description="Select payment method"
                >
                    <Container p={15}>
                        <Text mb={15}>Select payment method</Text>
                        <SimpleGrid cols={3} m={15}>
                            {paymentOptions &&
                                paymentOptions.map((p) => {
                                    return (
                                        <Card
                                            onClick={() =>
                                                setSelectedPaymentId(p.id)
                                            }
                                            key={p.name}
                                            shadow="md"
                                            radius="md"
                                            className={
                                                selectedPaymentId === p.id
                                                    ? classes.cardActive
                                                    : classes.card
                                            }
                                        >
                                            <Text
                                                fz="lg"
                                                fw={500}
                                                className={classes.cardTitle}
                                                mt="md"
                                            >
                                                {p.name}
                                            </Text>
                                            <Text fz="sm" c="dimmed" mt="sm">
                                                {p.description}
                                            </Text>
                                        </Card>
                                    );
                                })}
                        </SimpleGrid>
                    </Container>
                </Stepper.Step>
                <Stepper.Step label="Confirm" description="Order summary">
                    <Container p={15}>
                        <Text mb={15}>Please confirm the details below</Text>
                        <Group justify="end">
                            <Stack justify="end" mb={15}>
                                <Text size="xl">Total: {cart?.totalPrice}</Text>
                                <Text size="xl">
                                    Tax: {cart ? 0.05 * cart.totalPrice : 0}
                                </Text>
                                <Text size="xl" fw={700}>
                                    Grand Total:{" "}
                                    {cart
                                        ? 0.05 * cart.totalPrice +
                                          cart.totalPrice
                                        : 0}
                                </Text>
                            </Stack>
                        </Group>
                    </Container>
                </Stepper.Step>
                <Stepper.Completed>
                    <Group justify="center">
                        <Text size="lg" mt={40}>
                            Order completed. Thank you for shopping with us!
                        </Text>
                    </Group>
                </Stepper.Completed>
            </Stepper>

            {active < 4 && (
                <Group justify="center" mt="xl" m={15}>
                    {active > 1 && (
                        <Button variant="default" onClick={prevStep}>
                            Back
                        </Button>
                    )}
                    <Button onClick={nextStep}>
                        {active === 3 ? "Complete checkout" : "Next step"}
                    </Button>
                </Group>
            )}
        </Container>
    );
}
