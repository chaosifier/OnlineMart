import { Flex, Grid } from "@mantine/core";
import { ProductCard } from "../card/productCard";
import { Product } from "../../../types/product";
import { CenterPopLoader } from "../../../components/common/loader";

export default function ProductsExploreComponent(props: { data: Product[] }) {
    return props.data && props.data.length > 0 ? (
        <Grid m={15}>
            {props.data.map((d, i) => (
                <Grid.Col key={i} span={{ base: 12, xs: 3 }}>
                    <ProductCard data={d} />
                </Grid.Col>
            ))}
        </Grid>
    ) : (
        <Flex justify="center" align="center">
            <CenterPopLoader />
        </Flex>
    );
}
