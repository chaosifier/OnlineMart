import { Container, Grid, SimpleGrid, Skeleton, rem } from "@mantine/core";
import { useParams } from "react-router-dom";

const PRIMARY_COL_HEIGHT = rem(300);

export default function ProductAddUpdatePage() {
    const { id } = useParams();
    const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

    return (
        <Container my="md">
            <h1>Product {id ? "update page" : "create page"}</h1>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                <Skeleton
                    height={PRIMARY_COL_HEIGHT}
                    radius="md"
                    animate={false}
                />
                <Grid gutter="md">
                    <Grid.Col>
                        <Skeleton
                            height={SECONDARY_COL_HEIGHT}
                            radius="md"
                            animate={false}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Skeleton
                            height={SECONDARY_COL_HEIGHT}
                            radius="md"
                            animate={false}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Skeleton
                            height={SECONDARY_COL_HEIGHT}
                            radius="md"
                            animate={false}
                        />
                    </Grid.Col>
                </Grid>
            </SimpleGrid>
        </Container>
    );
}
