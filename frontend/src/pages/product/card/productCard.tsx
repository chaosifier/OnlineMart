import { IconShoppingCart, IconShoppingCartFilled } from "@tabler/icons-react";
import {
    Card,
    Image,
    Text,
    Group,
    Badge,
    Button,
    ActionIcon,
} from "@mantine/core";
import classes from "./productCard.module.css";
import { Product } from "../../../types/product";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function ProductCard(props: { data: Product }) {
    const navigate = useNavigate();
    const { id, images, title, description, category } = props.data;

    const [inCart, setInCart] = useState(false);
    const badges = [
        { emoji: "☀️", label: "Sunny weather" },
        { emoji: "🦓", label: "Onsite zoo" },
        { emoji: "🌊", label: "Sea" },
        { emoji: "🌲", label: "Nature" },
        { emoji: "🤽", label: "Water sports" },
    ];

    const features = badges.map((badge) => (
        <Badge variant="light" key={badge.label} leftSection={badge.emoji}>
            {badge.label}
        </Badge>
    ));

    const handleAddToCart = () => {
        console.log("add/remove to/from cart");
        setInCart(!inCart);
    };

    const handleProductClick = () => {
        navigate(`/products/${id}`);
    };

    return (
        <Card withBorder radius="md" p="md" className={classes.card}>
            {images.length > 0 && (
                <Card.Section>
                    <Image src={images[0]} alt={title} height={180} />
                </Card.Section>
            )}

            <Card.Section className={classes.section} mt="md">
                <Group justify="apart">
                    <Text fz="lg" fw={500}>
                        {title}
                    </Text>
                    <Badge size="sm" variant="light">
                        {category}
                    </Badge>
                </Group>
                <Text fz="sm" mt="xs">
                    {description}
                </Text>
            </Card.Section>

            <Card.Section className={classes.section}>
                <Text mt="md" className={classes.label} c="dimmed">
                    Perfect for you, if you enjoy
                </Text>
                <Group gap={7} mt={5}>
                    {features}
                </Group>
            </Card.Section>

            <Group mt="xs">
                <Button
                    onClick={handleProductClick}
                    radius="md"
                    style={{ flex: 1 }}
                >
                    Show details
                </Button>
                <ActionIcon
                    onClick={handleAddToCart}
                    variant="default"
                    radius="md"
                    size={36}
                >
                    {inCart ? (
                        <IconShoppingCartFilled
                            className={classes.like}
                            stroke={1.5}
                        />
                    ) : (
                        <IconShoppingCart
                            className={classes.like}
                            stroke={1.5}
                        />
                    )}
                </ActionIcon>
            </Group>
        </Card>
    );
}
