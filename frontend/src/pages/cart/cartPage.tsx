import { Button, Container, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
    const navigate = useNavigate();

    return (
        <Container>
            <Title>Cart page</Title>
            <Button onClick={() => navigate("/checkout")}>Checkout</Button>
        </Container>
    );
}
