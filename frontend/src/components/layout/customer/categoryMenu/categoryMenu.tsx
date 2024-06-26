import { Group, UnstyledButton, Menu } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";
import { Category } from "../../../../types/category";
import { categoryService } from "../../../../service/category.service";
import { useNavigate } from "react-router-dom";

export default function CategoryMenuComponent() {
    const [catLinks, setCatLinks] = useState<JSX.Element[]>();
    const navigate = useNavigate();
    const fetchData = useCallback(async () => {
        const res = await categoryService.getAll();
        if (res.success) {
            const links = getMenuItems(res.data as Array<Category>);
            setCatLinks(links);
        } else {
            console.log({ res });
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleCategoryClick = (slug: string, catId: number) => {
        navigate(`/products?category=${slug}&catId=${catId}`, {
            replace: true,
        });
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
                        onClick={() => handleCategoryClick(link.slug, link.id)}
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
