import ProductsExploreComponent from "../exploreList/productsExploreComponent";
import classes from "./productsExplorePage.module.css";
import ExploreSidebarComponent from "./sideBar/exploreSidebarComponent";
import {
    ProductFilterParam,
    productService,
} from "../../../service/product.service";
import { useCallback, useEffect, useState } from "react";
import { Product } from "../../../types/product";
import { Container } from "@mantine/core";

export default function ProductsExplorePage() {
    const [data, setData] = useState<Array<Product> | null>(null);

    const handleFilter = async (params: Partial<ProductFilterParam>) => {
        const res = await productService.filter(params);
        if (res.success) {
            setData(res.data as Array<Product>);
        } else {
            console.log(res);
        }
    };

    const fetchData = useCallback(async () => {
        await handleFilter({});
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className={classes.wrapper}>
            <ExploreSidebarComponent filterHandler={handleFilter} />
            <Container fluid>
                <ProductsExploreComponent data={data} />
            </Container>
        </div>
    );
}
