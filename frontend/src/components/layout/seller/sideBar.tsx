import {
    UnstyledButton,
    Badge,
    Text,
    Group,
    rem,
    Container,
} from "@mantine/core";
import { IconCheckbox, IconTruckDelivery } from "@tabler/icons-react";
import classes from "./sideBar.module.css";
import { Outlet } from "react-router-dom";

const links = [
    { icon: IconTruckDelivery, label: "Delivery", notifications: 3 },
    { icon: IconCheckbox, label: "Order", notifications: 4 },
];

const collections = [
    { emoji: "📦", label: "Product" },
    { emoji: "🛒", label: "Order" },
    { emoji: "🚚", label: "Delivery" },
    { emoji: "📊", label: "Reports" },
];

const SellerSideBar = () => {
    const mainLinks = links.map((link) => (
        <UnstyledButton key={link.label} className={classes.mainLink}>
            <div className={classes.mainLinkInner}>
                <link.icon
                    size={20}
                    className={classes.mainLinkIcon}
                    stroke={1.5}
                />
                <span>{link.label}</span>
            </div>
            {link.notifications && (
                <Badge
                    size="sm"
                    variant="filled"
                    className={classes.mainLinkBadge}
                >
                    {link.notifications}
                </Badge>
            )}
        </UnstyledButton>
    ));

    const collectionLinks = collections.map((collection) => (
        <a
            href="#"
            onClick={(event) => event.preventDefault()}
            key={collection.label}
            className={classes.collectionLink}
        >
            <span style={{ marginRight: rem(9), fontSize: rem(16) }}>
                {collection.emoji}
            </span>{" "}
            {collection.label}
        </a>
    ));

    return (
        <div className={classes.wrapper}>
            <nav className={classes.navbar}>
                <div className={classes.section}>
                    <div className={classes.mainLinks}>{mainLinks}</div>
                </div>

                <div className={classes.section}>
                    <Group
                        className={classes.collectionsHeader}
                        justify="space-between"
                    >
                        <Text size="xs" fw={500} c="dimmed">
                            Records
                        </Text>
                    </Group>
                    <div className={classes.collections}>{collectionLinks}</div>
                </div>
            </nav>
            <Container>
                <Outlet />
            </Container>
        </div>
    );
};

export default SellerSideBar;
