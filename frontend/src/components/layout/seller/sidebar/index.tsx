import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Group, Code, ScrollArea, Text, Container, rem } from "@mantine/core";
import { IconGiftFilled, IconShoppingCart } from "@tabler/icons-react";
import { GroupLinks, MenuLinks } from "../groupLinks";

import classes from "./sidebar.module.css";

const sideBarMenus: MenuLinks[] = [
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
                label: "List",
                link: "/seller/products",
                menuId: "product_list",
            },
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

const getActiveMenu = (menus: MenuLinks[], match: string): string => {
    const matched = menus.map((item: MenuLinks) => {
        if (item.link && item.link === match) {
            return item.menuId;
        }
        return getActiveMenu(item.links ?? [], match);
    });

    return matched.filter((o) => o)[0];
};

export function SideBar() {
    const { pathname } = useLocation();
    const [activeMenu, setActiveMenu] = useState(() => {
        return getActiveMenu(sideBarMenus, pathname);
    });

    const links = sideBarMenus.map((item) => (
        <GroupLinks
            {...item}
            menu={item}
            key={item.label}
            setActiveMenu={setActiveMenu}
            activeMenu={activeMenu}
        />
    ));

    return (
        <div style={{ display: "flex" }}>
            <nav className={classes.navbar}>
                <div className={classes.header}>
                    <Group justify="space-between">
                        <Text style={{ width: rem(120) }}>Online Mart</Text>
                        <Code fw={700}>v1.1.0</Code>
                    </Group>
                </div>

                <ScrollArea className={classes.links}>
                    <div className={classes.linksInner}>{links}</div>
                </ScrollArea>
            </nav>
            <Container>
                <Outlet />
            </Container>
        </div>
    );
}
