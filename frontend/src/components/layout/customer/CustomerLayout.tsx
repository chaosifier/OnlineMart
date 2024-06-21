import { useContext, useEffect } from "react";
import {
    Container,
    Group,
    UnstyledButton,
    Text,
    rem,
    Title,
    Badge,
} from "@mantine/core";
import { IconShoppingBag, IconBuildingStore } from "@tabler/icons-react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserSessionContext } from "../../../context/UserSession";
import CategoryMenuComponent from "./categoryMenu/categoryMenu";
import Search from "../../common/search";
import LoggedInMenu from "./loggedInMenu";
import DefaultMenu from "./defaultMenu";
import { CartSessionContext, initializeCart } from "../../../context/cart";
import { cartService } from "../../../service/cart.service";
import { Cart } from "../../../types/cart";
import classes from "./CustomerLayout.module.css";

const CustomerLayout = () => {
    const { isLoggedIn, user } = useContext(UserSessionContext);
    const { dispatch, cart } = useContext(CartSessionContext);

    useEffect(() => {
        if (isLoggedIn) {
            cartService.getCartItems().then((data) => {
                initializeCart(dispatch!, { cart: data.data as Cart });
            });
        } else {
            const items = localStorage.getItem("cart");
            initializeCart(dispatch!, { cart: items ? JSON.parse(items) : [] });
        }
    }, [isLoggedIn]);

    const navigate = useNavigate();

    const goToRegister = () => {
        return navigate("/register?client=seller");
    };

    const goToCart = () => {
        navigate("/cart");
    };

    const goToHome = () => {
        // navigate based on role
        navigate("/");
    };

    const handleSearch = (v: string) => {
        if (v.trim()) {
            navigate(`/products?query=${v}`);
        }
    };

    return (
        <>
          <Container pl={20} pr={20} className={classes.mainSection} size="md" fluid>
                    <Group justify="space-between">
                        <UnstyledButton>
                            <Title onClick={goToHome}>Online Mart</Title>
                        </UnstyledButton>

                        <Search
                            placeholder="search products"
                            onClick={handleSearch}
                        />

                        <Group justify="space-between" gap={rem(30)}>
                            {isLoggedIn && user ? (
                                <LoggedInMenu user={user} />
                            ) : (
                                <DefaultMenu />
                            )}

                            <UnstyledButton onClick={goToCart}>
                                <Group
                                    gap={rem(5)}
                                    style={{ position: "relative" }}
                                >
                                    <IconShoppingBag radius="xl" size={35} />
                                    {/* <Text fw={500} size="sm" lh={1} mr={3}>
                                        Cart
                                    </Text> */}
                                    {isLoggedIn && (
                                        <Badge
                                            size="sm"
                                            variant="filled"
                                            color="red"
                                            style={{
                                                position: "absolute",
                                                top: -5,
                                                right: -10,
                                                width: rem(25),
                                                height: rem(25),
                                                pointerEvents: "none",
                                            }}
                                        >
                                            {cart?.items?.length}
                                        </Badge>
                                    )}
                                </Group>
                            </UnstyledButton>
                            {!isLoggedIn && (
                                <UnstyledButton onClick={goToRegister}>
                                    <Group gap={rem(5)}>
                                        <IconBuildingStore
                                            radius="xl"
                                            size={35}
                                        />
                                        <Text fw={500} size="sm" lh={1} mr={3}>
                                            Register As a Seller
                                        </Text>
                                    </Group>
                                </UnstyledButton>
                            )}
                        </Group>
                    </Group>
                </Container>
                <CategoryMenuComponent />
            <Outlet />
        </>
    );
};
export default CustomerLayout;
