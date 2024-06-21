import {
    Button,
    Container,
    Title,
    Text,
    Group,
    Grid,
    Stack,
} from "@mantine/core";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartSessionContext } from "../../context/cart";
import { CartItemCard } from "./card/cartItemCard";

export default function CartPage() {
    const navigate = useNavigate();
    const { cart, dispatch } = useContext(CartSessionContext);

    return (
        <Container>
            <Title>Cart items</Title>

            {cart && cart.items && cart.items.length > 0 ? (
                <Grid m={15}>
                    {cart.items.map((d, i) => (
                        <Grid.Col key={i} span={{ base: 12, xs: 3 }}>
                            <CartItemCard data={d} />
                        </Grid.Col>
                    ))}
                </Grid>
            ) : (
                <Text>No items in cart</Text>
            )}

            <Stack>
                <Group justify="end" mb={15}>
                    <Text size="xl">Total: {cart?.totalPrice}</Text>
                </Group>
                <Group justify="end" mb={15}>
                    <Button
                        size="lg"
                        color="teal"
                        onClick={() => navigate("/checkout")}
                    >
                        Checkout
                    </Button>{" "}
                </Group>
            </Stack>
        </Container>
    );
}
