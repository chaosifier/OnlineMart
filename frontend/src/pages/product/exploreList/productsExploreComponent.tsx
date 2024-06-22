import { Flex, Grid, Text } from "@mantine/core";
import { ProductCard } from "../card/productCard";
import { Product } from "../../../types/product";
import { CenterPopLoader } from "../../../components/common/loader";

export default function ProductsExploreComponent(props: {
    data: Product[] | null;
}) {
    const { data } = props;

    if (data == null) {
        return (
            <Flex justify="center" align="center">
                <CenterPopLoader />
            </Flex>
        );
    } else if (data.length === 0) {
        return <Text>No items found</Text>;
    } else {
        return (
            <Grid m={15}>
                {data.map((d, i) => (
                    <Grid.Col key={i} span={{ base: 12, xs: 3 }}>
                        <ProductCard data={d} />
                    </Grid.Col>
                ))}
            </Grid>
        );
    }
}
