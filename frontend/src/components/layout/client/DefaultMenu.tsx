import {
    Avatar,
    Group,
    Menu,
    UnstyledButton,
    rem,
    useMantineTheme,
} from "@mantine/core";
import { IconChevronDown, IconLogin2 } from "@tabler/icons-react";

import classes from "./clientLayout.module.css";
import { useState } from "react";

const DefaultMenu = () => {
    const theme = useMantineTheme();
    const [userMenuOpened, setUserMenuOpened] = useState(false);

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
                >
                    Login
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};

export default DefaultMenu;
