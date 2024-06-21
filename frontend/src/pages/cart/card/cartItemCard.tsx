import { IconShoppingCart, IconShoppingCartFilled } from "@tabler/icons-react";
import {
    Card,
    Image,
    Text,
    Group,
    Badge,
    Button,
    ActionIcon,
    CardSection,
} from "@mantine/core";
import classes from "./cartItemCard.module.css";
import { Product } from "../../../types/product";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { endpoints } from "../../../common/config";
import { cartService } from "../../../service/cart.service";
import {
    CartSessionContext,
    initializeCart,
    // addItemToCart,
} from "../../../context/cart";
import { Cart, CartItem } from "../../../types/cart";

export function CartItemCard(props: { data: CartItem }) {
    const navigate = useNavigate();
    const { quantity } = props.data;
    const { id, images, title, description, category } = props.data.product;
    const { dispatch } = useContext(CartSessionContext);

    const handleRemove = async () => {
        let resp = await cartService.removeFromCart(props.data.id);
        if (resp.success) {
            initializeCart(dispatch!, { cart: resp.data as Cart });
        } else {
            console.log("failure", resp);
        }
    };

    const handleProductClick = () => {
        navigate(`/products/${id}`);
    };

    return (
        <Card withBorder radius="md" p="md" className={classes.card}>
            {images.length > 0 && (
                <Card.Section>
                    <Image
                        src={
                            endpoints.backendService.imageCdnUrl +
                            images[0].path
                        }
                        alt={title}
                        height={180}
                    />
                </Card.Section>
            )}

            <Card.Section className={classes.section} mt="md">
                <Group justify="apart">
                    <Text fz="lg" fw={500}>
                        {title}
                    </Text>
                    <Badge size="sm" variant="light">
                        {category.title}
                    </Badge>
                </Group>
                <Text fz="sm" mt="xs">
                    {description}
                </Text>
            </Card.Section>

            <CardSection className={classes.section} mt="md">
                <Group>
                    <Text>Quantity: </Text>
                    <Text fw={700}>{quantity}</Text>
                </Group>
            </CardSection>

            <Group mt="xs" justify="space-between">
                <Button
                    onClick={handleProductClick}
                    radius="md"
                    style={{ flex: 1 }}
                >
                    Details
                </Button>
                <Button radius="md" color="red" onClick={handleRemove}>
                    Remove
                </Button>
            </Group>
        </Card>
    );
}
