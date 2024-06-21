import { useContext } from "react";
import { Container, Flex } from "@mantine/core";
import classes from "./sellerLayout.module.css";
import TopMenu from "./topMenu";

import { UserSessionContext } from "../../../context/UserSession";
import { SideBar } from "./sidebar";

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
                <SideBar />
            </main>
        </>
    );
};
export default SellerLayout;
