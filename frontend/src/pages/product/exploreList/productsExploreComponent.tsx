import {
    Card,
    Text,
    SimpleGrid,
    UnstyledButton,
    Anchor,
    Group,
    useMantineTheme,
    Container,
    Grid,
    ScrollArea,
} from "@mantine/core";
import {
    IconCreditCard,
    IconBuildingBank,
    IconRepeat,
    IconReceiptRefund,
    IconReceipt,
    IconReceiptTax,
    IconReport,
    IconCashBanknote,
    IconCoin,
} from "@tabler/icons-react";
import classes from "./productsExploreComponent.module.css";
import { ProductCard } from "../card/productCard";

const mockdata = [
    { title: "Credit cards", icon: IconCreditCard, color: "violet" },
    { title: "Banks nearby", icon: IconBuildingBank, color: "indigo" },
    { title: "Transfers", icon: IconRepeat, color: "blue" },
    { title: "Refunds", icon: IconReceiptRefund, color: "green" },
    { title: "Receipts", icon: IconReceipt, color: "teal" },
    { title: "Taxes", icon: IconReceiptTax, color: "cyan" },
    { title: "Reports", icon: IconReport, color: "pink" },
    { title: "Payments", icon: IconCoin, color: "red" },
    { title: "Cashback", icon: IconCashBanknote, color: "orange" },
];

export default function ProductsExploreComponent() {
    const theme = useMantineTheme();

    const items = mockdata.map((item) => (
        <UnstyledButton key={item.title} className={classes.item}>
            <item.icon color={theme.colors[item.color][6]} size="2rem" />
            <Text size="xs" mt={7}>
                {item.title}
            </Text>
        </UnstyledButton>
    ));

    return (
        <Grid m={15}>
            {mockdata.map((d) => (
                <Grid.Col span={{ base: 12, xs: 4 }}>
                    <ProductCard />
                </Grid.Col>
            ))}
        </Grid>
    );
}
