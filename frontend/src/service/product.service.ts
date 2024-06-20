import { Backend } from "../common/http";
import { Service } from "../common/service";
import { Product } from "../types/product";
import { BaseResponse } from "../types/response";
import { endpoints } from "../common/config";

class ProductService implements Service<Product, Product, number> {
    async create(data: Product): Promise<BaseResponse<Product>> {
        return await Backend.apply<Product>({
            ...endpoints.backendService.endpoints.product.add,
            data: data,
        });
    }
    async getAll(): Promise<BaseResponse<Product[] | null>> {
        let fakeData = {
            status: true,
            data: [
                {
                    id: 1,
                    title: "iPhone 11 Pro Max",
                    description: "Comes with 128 GB storage",
                    price: 999,
                    images: ["https://picsum.photos/seed/a/200/300"],
                    category: "cell-phone",
                },
                {
                    id: 2,
                    title: "iPhone 11 Pro Max",
                    description: "Comes with 128 GB storage",
                    price: 999,
                    images: ["https://picsum.photos/seed/b/200/300"],
                    category: "cell-phone",
                },
                {
                    id: 3,
                    title: "iPhone 11 Pro Max",
                    description: "Comes with 128 GB storage",
                    price: 999,
                    images: ["https://picsum.photos/seed/c/200/300"],
                    category: "cell-phone",
                },
                {
                    id: 4,
                    title: "iPhone 11 Pro Max",
                    description: "Comes with 128 GB storage",
                    price: 999,
                    images: ["https://picsum.photos/seed/d/200/300"],
                    category: "cell-phone",
                },
            ],
            message: "",
        };
        return fakeData;

        return await Backend.apply<Product[]>({
            ...endpoints.backendService.endpoints.product.getAll,
        });
    }
    async get(id: number): Promise<BaseResponse<Product | null>> {
        let fakeData = {
            status: true,
            data: {
                id: 1,
                title: "iPhone 11 Pro Max",
                description: "Comes with 128 GB storage. Build fully functional accessible web applications faster than ever – Mantine b includes more than 120 customizable components and hooks to cover you in any situation",
                price: 999,
                images: ["https://picsum.photos/seed/a/200/300", "https://picsum.photos/seed/b/200/300"],
                category: "cell-phone",
            },
            message: "",
        };
        return fakeData;

        return await Backend.apply<Product>({
            ...endpoints.backendService.endpoints.product.getSingle,
        });
    }
    async delete(id: number): Promise<BaseResponse<null>> {
        return await Backend.apply<null>({
            ...endpoints.backendService.endpoints.product.delete,
            url: endpoints.backendService.endpoints.product.delete.url.replace(
                "{id}",
                id.toString()
            ),
        });
    }
    async patch(id: number, data: Product): Promise<BaseResponse<null>> {
        return await Backend.apply<null>({
            ...endpoints.backendService.endpoints.product.update,
            url: endpoints.backendService.endpoints.product.update.url.replace(
                "{id}",
                id.toString()
            ),
            data,
        });
    }
}

export const productService = new ProductService();
