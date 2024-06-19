import { useContext } from "react";
import { Container, Group, rem } from "@mantine/core";
import Search from "../../common/search";
import classes from "./sellerLayout.module.css";
import TopMenu from "./topMenu";

import { UserSessionContext } from "../../../context/UserSession";
import { useNavigate } from "react-router-dom";
import SellerSideBar from "./sideBar";

const SellerLayout = () => {
    const { isLoggedIn, user } = useContext(UserSessionContext);

    const navigate = useNavigate();

    return (
        <>
            <header className={classes.header}>
                <Container className={classes.mainSection} size="md">
                    <Group justify="center" gap={90}>
                        <Search />

                        <Group justify="space-between" gap={rem(30)}>
                            <TopMenu user={user!} />
                        </Group>
                    </Group>
                </Container>
            </header>
            <main>
                <SellerSideBar />
            </main>
        </>
    );
};
export default SellerLayout;
