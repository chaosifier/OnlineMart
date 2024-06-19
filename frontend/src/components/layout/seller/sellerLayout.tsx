import { useContext } from "react";
import { Container, Flex } from "@mantine/core";
import classes from "./sellerLayout.module.css";
import TopMenu from "./topMenu";

import { UserSessionContext } from "../../../context/UserSession";
import SellerSideBar from "./sideBar";

const SellerLayout = () => {
    const { isLoggedIn, user } = useContext(UserSessionContext);

    return (
        <>
            <header className={classes.header}>
                <Container className={classes.mainSection} size="lg">
                    <Flex justify="flex-end">
                        <TopMenu user={user!} />
                    </Flex>
                </Container>
            </header>
            <main>
                <SellerSideBar />
            </main>
        </>
    );
};
export default SellerLayout;
