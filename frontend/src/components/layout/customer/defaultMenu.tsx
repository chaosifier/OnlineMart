import {
    Avatar,
    Group,
    Menu,
    UnstyledButton,
    rem,
    useMantineTheme,
} from "@mantine/core";
import { IconChevronDown, IconLogin2 } from "@tabler/icons-react";

import classes from "./CustomerLayout.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DefaultMenu = () => {
    const theme = useMantineTheme();
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const navigate = useNavigate();

    const goToLogin = () => {
        return navigate("/login?client=customer");
    };

    const goToRegister = () => {
        return navigate("/register?client=customer");
    };

    return (
        <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: "pop-top-right" }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
        >
            <Menu.Target>
                <UnstyledButton
                    className={`${classes.user} ${
                        userMenuOpened ? classes.userActive : ""
                    }`}
                >
                    <Group gap={7}>
                        <Avatar radius="xl" size={35} />

                        <IconChevronDown
                            style={{
                                width: rem(12),
                                height: rem(12),
                            }}
                            stroke={1.5}
                        />
                    </Group>
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item
                    leftSection={
                        <IconLogin2
                            style={{
                                width: rem(16),
                                height: rem(16),
                            }}
                            color={theme.colors.blue[6]}
                            stroke={1.5}
                        />
                    }
                    onClick={goToLogin}
                >
                    Login
                </Menu.Item>
                <Menu.Item
                    leftSection={
                        <IconLogin2
                            style={{
                                width: rem(16),
                                height: rem(16),
                            }}
                            color={theme.colors.blue[6]}
                            stroke={1.5}
                        />
                    }
                    onClick={goToRegister}
                >
                    Register
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};

export default DefaultMenu;
