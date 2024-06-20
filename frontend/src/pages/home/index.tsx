import { useCallback, useEffect, useState } from "react";
import ProductsExploreComponent from "../product/exploreList/productsExploreComponent";
import { Product } from "../../types/product";
import { productService } from "../../service/product.service";

const HomePage = () => {
    const [data, setData] = useState(new Array<Product>());

    const fetchData = useCallback(async () => {
        let res = await productService.getAll();
        if (res.status) {
            setData(res.data as Array<Product>);
        } else {
            alert(res.message);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return <ProductsExploreComponent data={data} />;
};

export default HomePage;
