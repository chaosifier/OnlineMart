import { IconShoppingCart, IconShoppingCartFilled } from "@tabler/icons-react";
import {
    Card,
    Image,
    Text,
    Group,
    Badge,
    Button,
    ActionIcon,
    Flex,
} from "@mantine/core";
import classes from "./productCard.module.css";
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
import { UserSessionContext } from "../../../context/UserSession";
import { Cart, CartItem } from "../../../types/cart";
import { Carousel, CarouselSlide } from "@mantine/carousel";

export function ProductCard(props: { data: Product }) {
    const { isLoggedIn } = useContext(UserSessionContext);
    const navigate = useNavigate();
    const { id, images, title, description, category, price } = props.data;
    const { cart, dispatch } = useContext(CartSessionContext);
    const [inCart, setInCart] = useState(false);
    const [cartItem, setCartItem] = useState<CartItem | null>();

    useEffect(() => {
        let toSet =
            cart &&
            cart.items &&
            cart.items.filter((i) => i.product.id === id).length > 0
                ? true
                : false;
        setInCart(toSet);
        console.log(toSet, "toSet");
    }, [cart]);

    const addRemoveFromCart = async (prodId: number) => {
        if (isLoggedIn) {
            let resp = cartItem
                ? await cartService.removeFromCart(cartItem.id)
                : await cartService.addToCart({
                      productId: prodId,
                      quantity: 1,
                  });
            if (resp.success) {
                initializeCart(dispatch!, { cart: resp.data as Cart });
            } else {
                console.log("failure", resp);
            }
        } else {
            navigate("/login");
        }
    };

    const getExistingCartItem = () => {
        return cart?.items?.find((c) => c.product.id === id);
    };

    useEffect(() => {
        let existingItm = getExistingCartItem();
        setCartItem(existingItm);
    }, [cart]);

    const handleProductClick = () => {
        navigate(`/products/${id}`);
    };

    return (
        <Card withBorder radius="md" p="md" className={classes.card}>
            <div className={classes.productImageContainer}>
                {images.length > 0 && (
                    <Card.Section>
                        <Carousel
                            withIndicators
                            loop
                            classNames={{
                                root: classes.carousel,
                                controls: classes.carouselControls,
                                indicator: classes.carouselIndicator,
                            }}
                        >
                            {images.map((s, i) => (
                                <CarouselSlide key={i}>
                                    <Image
                                        src={`${endpoints.backendService.imageCdnUrl}${s.path}`}
                                        alt={title}
                                        height={180}
                                        style={{ objectFit: "cover" }}
                                        fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                                    />
                                </CarouselSlide>
                            ))}
                        </Carousel>
                        {/* <Image
                            src={
                                endpoints.backendService.imageCdnUrl +
                                images[0].path
                            }
                            alt={title}
                            height={180}
                            style={{ objectFit: "cover" }}
                            fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                        /> */}
                    </Card.Section>
                )}
            </div>

            <Group align={"end"}>
                <Badge size="sm" variant="light">
                    {category.title}
                </Badge>
            </Group>
            <Card.Section className={classes.section} mt="xs">
                <Text fz="lg" fw={500}>
                    {title}
                </Text>
                <Text
                    fz="sm"
                    dangerouslySetInnerHTML={{ __html: description }}
                ></Text>

                <Text fz="md" fw={500}>
                    Price: ${price}
                </Text>
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
                    onClick={() => addRemoveFromCart(id)}
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
