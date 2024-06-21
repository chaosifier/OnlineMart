import ProductsExploreComponent from "../exploreList/productsExploreComponent";
import classes from "./productsExplorePage.module.css";
import ExploreSidebarComponent from "./sideBar/exploreSidebarComponent";
import { productService } from "../../../service/product.service";
import { useCallback, useEffect, useState } from "react";
import { Product } from "../../../types/product";

export default function ProductsExplorePage() {
    const [data, setData] = useState(new Array<Product>());

    const fetchData = useCallback(async () => {
        let res = await productService.getAll();
        if (res.success) {
            setData(res.data as Array<Product>);
        } else {
            console.log({ res })(res.message);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className={classes.wrapper}>
            <ExploreSidebarComponent />
            <ProductsExploreComponent data={data} />
        </div>
    );
}
