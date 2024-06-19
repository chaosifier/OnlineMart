import {
    Container,
    Group,
    UnstyledButton,
    Text,
    rem,
    Title,
} from "@mantine/core";
import classes from "./clientLayout.module.css";
import { IconShoppingBag, IconBuildingStore } from "@tabler/icons-react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserSessionContext } from "../../../context/UserSession";
import CategoryMenuComponent from "./categoryMenu/categoryMenu";
import { useContext } from "react";
import Search from "../../common/search";
import LoggedInMenu from "./loggedInMenu";
import DefaultMenu from "./defaultMenu";

const ClientLayout = () => {
    const { isLoggedIn, user } = useContext(UserSessionContext);

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
        navigate(`/products?query=${v}`);
    };

    return (
        <>
            <header className={classes.header}>
                <Container className={classes.mainSection} size="md">
                    <Group justify="space-around">
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
                                <Group gap={rem(5)}>
                                    <IconShoppingBag radius="xl" size={35} />
                                    <Text fw={500} size="sm" lh={1} mr={3}>
                                        Cart
                                    </Text>
                                </Group>
                            </UnstyledButton>
                            <UnstyledButton onClick={goToRegister}>
                                <Group gap={rem(5)}>
                                    <IconBuildingStore radius="xl" size={35} />
                                    <Text fw={500} size="sm" lh={1} mr={3}>
                                        Register As a Seller
                                    </Text>
                                </Group>
                            </UnstyledButton>
                        </Group>
                    </Group>
                </Container>
                <CategoryMenuComponent />
            </header>
            <Outlet />
        </>
    );
};
export default ClientLayout;
