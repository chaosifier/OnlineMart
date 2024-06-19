import {
    TextInput,
    Code,
    UnstyledButton,
    Badge,
    Text,
    Group,
    ActionIcon,
    Tooltip,
    rem,
    Container,
    Title,
    SimpleGrid,
    RangeSlider,
} from "@mantine/core";
import {
    IconBulb,
    IconUser,
    IconCheckbox,
    IconSearch,
    IconPlus,
} from "@tabler/icons-react";
import classes from "./exploreSidebarComponent.module.css";
import { useParams } from "react-router-dom";

const links = [
    { icon: IconBulb, label: "Activity", notifications: 3 },
    { icon: IconCheckbox, label: "Tasks", notifications: 4 },
    { icon: IconUser, label: "Contacts" },
];

const collections = [
    { emoji: "👍", label: "Sales" },
    { emoji: "🚚", label: "Deliveries" },
    { emoji: "💸", label: "Discounts" },
    { emoji: "💰", label: "Profits" },
    { emoji: "✨", label: "Reports" },
    { emoji: "🛒", label: "Orders" },
    { emoji: "📅", label: "Events" },
    { emoji: "🙈", label: "Debts" },
    { emoji: "💁‍♀️", label: "Customers" },
];

export default function ExploreSidebarComponent() {  
    const queryParams = new URLSearchParams(window.location.search)
    const searchTerm = queryParams.get("query")
    
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
console.log(searchTerm, 'searchTerm');
    return (
        <nav className={classes.navbar}>
            {searchTerm && (
                <TextInput
                    value={searchTerm}
                    placeholder="Search"
                    disabled
                    size="xs"
                    leftSection={
                        <IconSearch
                            style={{ width: rem(12), height: rem(12) }}
                            stroke={1.5}
                        />
                    }
                    rightSectionWidth={70}
                    styles={{ section: { pointerEvents: "none" } }}
                    mb="sm"
                />
            )}

            <div className={classes.section}>
                <Text component="label" htmlFor="test" size="sm" fw={500}>
                    Price range
                </Text>
                <RangeSlider
                    labelAlwaysOn
                    defaultValue={[20, 60]}
                    classNames={classes}
                />
            </div>

            <div className={classes.section}>
                <div className={classes.mainLinks}>{mainLinks}</div>
            </div>

            <div className={classes.section}>
                <Group
                    className={classes.collectionsHeader}
                    justify="space-between"
                >
                    <Text size="xs" fw={500} c="dimmed">
                        Collections
                    </Text>
                    <Tooltip
                        label="Create collection"
                        withArrow
                        position="right"
                    >
                        <ActionIcon variant="default" size={18}>
                            <IconPlus
                                style={{ width: rem(12), height: rem(12) }}
                                stroke={1.5}
                            />
                        </ActionIcon>
                    </Tooltip>
                </Group>
                <div className={classes.collections}>{collectionLinks}</div>
            </div>
        </nav>
    );
}
