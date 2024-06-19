import { Container, Group, UnstyledButton, Text, rem } from "@mantine/core";
import Search from "../../common/search";
import classes from "./clientLayout.module.css";
import { IconShoppingBag, IconBuildingStore } from "@tabler/icons-react";
import LoggedInMenu from "./LoggedInMenu";
import DefaultMenu from "./DefaultMenu";
import { useContext } from "react";

import { UserSessionContext } from "../../../context/UserSession";

const ClientLayout = () => {
    const { isLoggedIn, user } = useContext(UserSessionContext);

    return (
        <>
            <header className={classes.header}>
                <Container className={classes.mainSection} size="md">
                    <Group justify="space-around">
                        <Search />

                        <Group justify="space-between" gap={rem(30)}>
                            {isLoggedIn && user ? (
                                <LoggedInMenu user={user} />
                            ) : (
                                <DefaultMenu />
                            )}

                            <UnstyledButton>
                                <Group gap={rem(5)}>
                                    <IconShoppingBag radius="xl" size={35} />
                                    <Text fw={500} size="sm" lh={1} mr={3}>
                                        Cart
                                    </Text>
                                </Group>
                            </UnstyledButton>
                            <UnstyledButton>
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
            </header>
        </>
    );
};
export default ClientLayout;
