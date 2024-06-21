import {
    Avatar,
    Group,
    Menu,
    UnstyledButton,
    Text,
    rem,
    useMantineTheme,
} from "@mantine/core";
import {
    IconChevronDown,
    IconLogout,
    IconMessage,
    IconSettings,
    IconStar,
    IconTrash,
} from "@tabler/icons-react";

import { useContext, useState } from "react";
import { User } from "../../../types/user";
import classes from "./sellerLayout.module.css";
import {
    UserSessionContext,
    removeUserSession,
} from "../../../context/UserSession";
import { useNavigate } from "react-router-dom";

interface ILoggedInSeller {
    user: User;
}

const TopMenu: React.FC<ILoggedInSeller> = ({ user }) => {
    const theme = useMantineTheme();
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const { dispatch } = useContext(UserSessionContext);
    const navigate = useNavigate();

    const userName = `${user?.firstName} ${user?.lastName}`;

    const logout = () => {
        removeUserSession(dispatch);
        navigate("/");
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
                        <Avatar
                            src={user?.image}
                            alt={userName}
                            radius="xl"
                            size={35}
                        />
                        <Text fw={500} size="sm" lh={1} mr={3}>
                            {userName}
                        </Text>

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
                        <IconStar
                            style={{
                                width: rem(16),
                                height: rem(16),
                            }}
                            color={theme.colors.yellow[6]}
                            stroke={1.5}
                        />
                    }
                >
                    Orders
                </Menu.Item>
                <Menu.Item
                    leftSection={
                        <IconMessage
                            style={{
                                width: rem(16),
                                height: rem(16),
                            }}
                            color={theme.colors.blue[6]}
                            stroke={1.5}
                        />
                    }
                >
                    Your reviews
                </Menu.Item>

                <Menu.Label>Settings</Menu.Label>
                <Menu.Item
                    leftSection={
                        <IconSettings
                            style={{
                                width: rem(16),
                                height: rem(16),
                            }}
                            stroke={1.5}
                        />
                    }
                >
                    Account settings
                </Menu.Item>
                <Menu.Item
                    onClick={logout}
                    leftSection={
                        <IconLogout
                            style={{
                                width: rem(16),
                                height: rem(16),
                            }}
                            stroke={1.5}
                        />
                    }
                >
                    Logout
                </Menu.Item>

                <Menu.Divider />

                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item
                    color="red"
                    leftSection={
                        <IconTrash
                            style={{
                                width: rem(16),
                                height: rem(16),
                            }}
                            stroke={1.5}
                        />
                    }
                >
                    Delete account
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};

export default TopMenu;
