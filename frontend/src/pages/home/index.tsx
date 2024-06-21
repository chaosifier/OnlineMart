import { useCallback, useEffect, useState } from "react";
import ProductsExploreComponent from "../product/exploreList/productsExploreComponent";
import { Product } from "../../types/product";
import { productService } from "../../service/product.service";

const HomePage = () => {
    const [data, setData] = useState(new Array<Product>());

    const fetchData = useCallback(async () => {
        const res = await productService.getAll();
        if (res.success) {
            setData(res.data as Array<Product>);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return <ProductsExploreComponent data={data} />;
};

export default HomePage;
