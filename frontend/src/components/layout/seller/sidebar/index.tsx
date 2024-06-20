import { useState } from "react";
import { Group, Code, ScrollArea, Text } from "@mantine/core";
import { IconGiftFilled, IconShoppingCart } from "@tabler/icons-react";
import { GroupLinks } from "../groupLinks";

import classes from "./sidebar.module.css";

const sideBarMenus = [
    {
        label: "Order",
        menuId: "order",
        icon: IconShoppingCart,
        link: "/seller/orders",
    },
    {
        label: "Product",
        menuId: "product",
        icon: IconGiftFilled,
        links: [
            {
                label: "Create",
                link: "/seller/products/create",
                menuId: "product_create",
            },
            {
                label: "Update",
                link: "/seller/products/update",
                menuId: "product_update",
            },
        ],
    },
];

export function SideBar() {
    const [activeMenu, setActiveMenu] = useState("order");

    const links = sideBarMenus.map((item) => (
        <GroupLinks
            {...item}
            key={item.label}
            setActiveMenu={setActiveMenu}
            activeMenu={activeMenu}
        />
    ));

    return (
        <nav className={classes.navbar}>
            <div className={classes.header}>
                <Group justify="space-between">
                    <Text>Online Mart</Text>
                    <Code fw={700}>v3.1.2</Code>
                </Group>
            </div>

            <ScrollArea className={classes.links}>
                <div className={classes.linksInner}>{links}</div>
            </ScrollArea>
        </nav>
    );
}
