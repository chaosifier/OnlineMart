import { useMemo, useState } from "react";
import {
    Group,
    Box,
    Collapse,
    ThemeIcon,
    Text,
    UnstyledButton,
    rem,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import classes from "./groupLinks.module.css";
import { useNavigate } from "react-router-dom";

export type MenuLinks = {
    label: string;
    link?: string;
    menuId: string;
    initiallyOpened?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon?: React.FC<any>;
    links?: MenuLinks[];
};

interface GroupLinksProps {
    menu: MenuLinks;
    activeMenu: string;
    setActiveMenu: (m: string) => void;
}

export function GroupLinks({
    menu,
    activeMenu,
    setActiveMenu,
}: GroupLinksProps) {
    const navigate = useNavigate();
    const { icon: Icon, label, menuId, link, links, initiallyOpened } = menu;
    const hasLinks = Array.isArray(links);

    const isParentOpened = useMemo(() => {
        return (
            (hasLinks ? links : [])?.filter((i) => i.menuId === activeMenu)
                .length > 0 ||
            initiallyOpened ||
            false
        );
    }, [activeMenu, links, initiallyOpened, hasLinks]);

    const [opened, setOpened] = useState(isParentOpened);
    const items = (hasLinks ? links : []).map((link) => {
        return (
            <Text<"a">
                component="a"
                className={classes.link}
                data-active={activeMenu === link.menuId || undefined}
                href={link.link}
                key={link.label}
                onClick={(event) => {
                    setActiveMenu(link.menuId);
                    link.link && navigate(link.link);
                    event.preventDefault();
                }}
            >
                {link.label}
            </Text>
        );
    });

    return (
        <>
            <UnstyledButton
                onClick={() => {
                    setOpened((o) => !o);
                    setActiveMenu(menuId);
                    link && navigate(link);
                }}
                className={classes.control}
                data-active={activeMenu === menuId || undefined}
            >
                <Group justify="space-between" gap={10}>
                    <Box style={{ display: "flex", alignItems: "center" }}>
                        <ThemeIcon variant="light" size={30}>
                            {Icon && (
                                <Icon
                                    style={{ width: rem(18), height: rem(18) }}
                                />
                            )}
                        </ThemeIcon>
                        <Box ml="md">{label}</Box>
                    </Box>
                    {hasLinks && (
                        <IconChevronRight
                            className={classes.chevron}
                            stroke={1.5}
                            style={{
                                width: rem(16),
                                height: rem(16),
                                transform: opened ? "rotate(-90deg)" : "none",
                            }}
                        />
                    )}
                </Group>
            </UnstyledButton>
            {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
        </>
    );
}
