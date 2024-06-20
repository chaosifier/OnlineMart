import { useState } from "react";
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

interface GroupLinksProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: React.FC<any>;
    label: string;
    menuId: string;
    initiallyOpened?: boolean;
    activeMenu: string;
    links?: { label: string; link: string; menuId: string }[];
    setActiveMenu: (m: string) => void;
}

export function GroupLinks({
    icon: Icon,
    label,
    menuId,
    initiallyOpened,
    links,
    activeMenu,
    setActiveMenu,
}: GroupLinksProps) {
    const hasLinks = Array.isArray(links);
    const [opened, setOpened] = useState(initiallyOpened || false);
    const items = (hasLinks ? links : []).map((link) => (
        <Text<"a">
            component="a"
            className={classes.link}
            data-active={activeMenu === link.menuId || undefined}
            href={link.link}
            key={link.label}
            onClick={(event) => {
                setActiveMenu(link.menuId);
                event.preventDefault();
            }}
        >
            {link.label}
        </Text>
    ));

    return (
        <>
            <UnstyledButton
                onClick={() => {
                    setOpened((o) => !o);
                    setActiveMenu(menuId);
                }}
                className={classes.control}
                data-active={activeMenu === menuId || undefined}
            >
                <Group justify="space-between" gap={10}>
                    <Box style={{ display: "flex", alignItems: "center" }}>
                        <ThemeIcon variant="light" size={30}>
                            <Icon style={{ width: rem(18), height: rem(18) }} />
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
