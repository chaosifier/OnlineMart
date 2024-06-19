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
import ProductsExploreComponent from "../exploreList/productsExploreComponent";
import classes from "./productsExplorePage.module.css";
import ExploreSidebarComponent from "./sideBar/exploreSidebarComponent";

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

export default function ProductsExplorePage() {
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
            <ExploreSidebarComponent />
            <ProductsExploreComponent />
        </div>
    );
}
