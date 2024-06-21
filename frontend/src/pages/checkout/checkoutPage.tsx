import { useState } from "react";
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
} from "@mantine/core";
import { ProductCard } from "../product/card/productCard";
import { Product } from "../../types/product";
import classes from "./checkoutPage.module.css";

export default function CheckoutPage() {
    const [active, setActive] = useState(0);
    const nextStep = () =>
        setActive((current) => (current < 4 ? current + 1 : current));
    const prevStep = () =>
        setActive((current) => (current > 0 ? current - 1 : current));

    const products: [Product] = [
        {
            id: 1,
            title: "iPhone 11 Pro Max",
            description: "Comes with 128 GB storage",
            price: 999,
            images: ["https://picsum.photos/seed/a/200/300"],
            category: ["cell-phone"],
        },
        {
            id: 2,
            title: "iPhone 11 Pro Max",
            description: "Comes with 128 GB storage",
            price: 999,
            images: ["https://picsum.photos/seed/b/200/300"],
            category: ["cell-phone"],
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
                            {products.map((p, i) => (
                                <ProductCard key={i} data={p} />
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
                                    placeholder="your@email.com"
                                    value="your@email.com"
                                    required
                                    classNames={{
                                        input: classes.input,
                                        label: classes.inputLabel,
                                    }}
                                />
                                <TextInput
                                    label="First name"
                                    placeholder="John"
                                    value="John"
                                    mt="md"
                                    classNames={{
                                        input: classes.input,
                                        label: classes.inputLabel,
                                    }}
                                />
                                <TextInput
                                    label="Last name"
                                    placeholder="Doe"
                                    value="Doe"
                                    mt="md"
                                    classNames={{
                                        input: classes.input,
                                        label: classes.inputLabel,
                                    }}
                                />
                                <TextInput
                                    label="Telephone"
                                    placeholder="641-5415214"
                                    value="641-5415214"
                                    mt="md"
                                    classNames={{
                                        input: classes.input,
                                        label: classes.inputLabel,
                                    }}
                                />
                                <TextInput
                                    label="Address"
                                    placeholder="S 2ND Street, Clarklane, Arkansas"
                                    value="S 2ND Street, Clarklane, Arkansas"
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
                    </Container>
                </Stepper.Step>
                <Stepper.Step label="Confirm" description="Order summary">
                    <Container p={15}>
                        <Text mb={15}>Almost there</Text>
                    </Container>
                </Stepper.Step>
                <Stepper.Completed>
                    Order completed. Thank you for shopping with us!
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
