import {
    HoverCard,
    Group,
    Button,
    UnstyledButton,
    Text,
    SimpleGrid,
    ThemeIcon,
    Anchor,
    Divider,
    Center,
    Box,
    Burger,
    Drawer,
    Collapse,
    ScrollArea,
    rem,
    useMantineTheme,
    Menu,
    Container,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
    IconNotification,
    IconCode,
    IconBook,
    IconChartPie3,
    IconFingerprint,
    IconCoin,
    IconChevronDown,
    IconChevronRight,
} from "@tabler/icons-react";
import classes from "./categoryMenu.module.css";
import { useCallback, useEffect, useState } from "react";
import { Category } from "../../../../types/category";
import { categoryService } from "../../../../service/category.service";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function CategoryMenuComponent() {
    const [catLinks, setCatLinks] = useState<JSX.Element[]>();
    const navigate = useNavigate();
    const fetchData = useCallback(async () => {
        let res = await categoryService.getAll();
        if (res.status) {
            let links = getMenuItems(res.data as Array<Category>);
            setCatLinks(links);
        } else {
            alert(res.message);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleCategoryClick = (slug: string) => {
        navigate(`/products?category=${slug}`);
    };

    const getMenuItem = (link: Category) => {
        return link.children.length > 0 ? (
            <Menu
                width={200}
                shadow="md"
                position="right-start"
                
                closeOnItemClick={false}
            >
                <Menu.Target>
                    <Menu.Item rightSection={<IconChevronRight size={18} />}>
                        {link.title}
                    </Menu.Item>
                </Menu.Target>
                <Menu.Dropdown>{getMenuItems(link.children)}</Menu.Dropdown>
            </Menu>
        ) : (
            <Menu
                width={200}
                shadow="md"
                position="right-start"
                closeOnItemClick={false}
            >
                <Menu.Item>
                    <UnstyledButton
                        onClick={() => handleCategoryClick(link.slug)}
                    >
                        {link.title}
                    </UnstyledButton>
                </Menu.Item>
            </Menu>
        );
    };

    const getMenuItems = (links: Array<Category>) => {
        const items = links.map((link, i) => {
            return <div key={i}>{getMenuItem(link)}</div>;
        });

        return items;
    };

    return <Group m={10}>{catLinks}</Group>;
}
