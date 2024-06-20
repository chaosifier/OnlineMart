import {
    Container,
    Grid,
    SimpleGrid,
    Skeleton,
    Title,
    Text,
    rem,
    Image,
    Group,
    Button,
    Badge,
    ActionIcon,
} from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productService } from "../../../service/product.service";
import { Product } from "../../../types/product";
import classes from "./productDetailPage.module.css";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import { IconShoppingCart, IconShoppingCartFilled } from "@tabler/icons-react";

const PRIMARY_COL_HEIGHT = rem(300);

export default function ProductDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState<Product>();
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

    const handleCheckout = () => {
        navigate("/checkout");
    };

    const fetchData = useCallback(async () => {
        if (id) {
            let res = await productService.get(Number.parseInt(id));
            if (res.status) {
                setData(res.data as Product);
            } else {
                alert(res.message);
            }
        }
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;
    const skeleton = (
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} />
            <Grid gutter="md">
                <Grid.Col>
                    <Skeleton
                        height={SECONDARY_COL_HEIGHT}
                        radius="md"
                        animate={false}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Skeleton
                        height={SECONDARY_COL_HEIGHT}
                        radius="md"
                        animate={false}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Skeleton
                        height={SECONDARY_COL_HEIGHT}
                        radius="md"
                        animate={false}
                    />
                </Grid.Col>
            </Grid>
        </SimpleGrid>
    );

    return (
        <Container my="md">
            {data ? (
                <div>
                    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                        <Carousel
                            withIndicators
                            loop
                            classNames={{
                                root: classes.carousel,
                                controls: classes.carouselControls,
                                indicator: classes.carouselIndicator,
                            }}
                        >
                            {data.images.map((s, i) => (
                                <CarouselSlide key={i}>
                                    <Image src={s} height={400} />
                                </CarouselSlide>
                            ))}
                        </Carousel>
                        <Grid gutter="md">
                            <Grid.Col>
                                <Title>{data.title}</Title>
                                <Text c="dimmed" mt="md">
                                    {data.description}
                                </Text>
                            </Grid.Col>
                            <Grid.Col span={12}>
                                <Group mb={15}>
                                    {features}
                                </Group>
                            </Grid.Col>
                            <Grid.Col span={12}>
                                <Group gap={30}>
                                    <Container>
                                        <Text
                                            fz="xl"
                                            fw={700}
                                            style={{ lineHeight: 1 }}
                                        >
                                            ${data.price}
                                        </Text>
                                        <Text
                                            fz="sm"
                                            c="dimmed"
                                            fw={500}
                                            style={{ lineHeight: 1 }}
                                            mt={3}
                                        >
                                            Special Price
                                        </Text>
                                    </Container>
                                    <Button
                                        radius="xl"
                                        style={{ flex: 1 }}
                                        onClick={handleCheckout}
                                    >
                                        Buy now
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
                            </Grid.Col>
                        </Grid>
                    </SimpleGrid>
                </div>
            ) : (
                skeleton
            )}
        </Container>
    );
}
