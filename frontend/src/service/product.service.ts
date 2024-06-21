import { Backend } from "../common/http";
import { Service } from "../common/service";
import { Product } from "../types/product";
import { BaseResponseWithSuccess, GenericResponse } from "../types/response";
import { endpoints } from "../common/config";

class ProductService implements Service<Product, Product, number> {
    async create(data: Product): Promise<GenericResponse<Partial<Product>>> {
        return await Backend.apply<Product>({
            ...endpoints.backendService.endpoints.product.add,
            data: data,
        });
    }
    async getAll(): Promise<GenericResponse<Partial<Product>[]>> {
        const fakeData: BaseResponseWithSuccess<Partial<Product>[]> = {
            status: true,
            data: [
                {
                    id: 1,
                    title: "iPhone 11 Pro Max",
                    description: "Comes with 128 GB storage",
                    price: 999,
                    images: ["https://picsum.photos/seed/a/200/300"],
                    category: ["cell-phone"],
                },
                {
                    id: 2,
                    title: "iPhone 11 Pro Max",
                    description: "Comes with 128 GB storage",
                    price: 999,
                    images: ["https://picsum.photos/seed/b/200/300"],
                    category: ["cell-phone"],
                },
                {
                    id: 3,
                    title: "iPhone 11 Pro Max",
                    description: "Comes with 128 GB storage",
                    price: 999,
                    images: ["https://picsum.photos/seed/c/200/300"],
                    category: ["cell-phone"],
                },
                {
                    id: 4,
                    title: "iPhone 11 Pro Max",
                    description: "Comes with 128 GB storage",
                    price: 999,
                    images: ["https://picsum.photos/seed/d/200/300"],
                    category: ["cell-phone"],
                },
            ],
            message: "",
        };
        return fakeData;

        return await Backend.apply<Product[]>({
            ...endpoints.backendService.endpoints.product.getAll,
        });
    }
    async get(id: number): Promise<GenericResponse<Product>> {
        const fakeData: BaseResponseWithSuccess<Product> = {
            status: true,
            data: {
                id: 1,
                title: "iPhone 11 Pro Max",
                description:
                    "Comes with 128 GB storage. Build fully functional accessible web applications faster than ever - Mantine b includes more than 120 customizable components and hooks to cover you in any situation",
                price: 999,
                images: [
                    {
                        id: 1,
                        path: "https://picsum.photos/seed/a/200/300",
                        title: "image",
                    },
                    {
                        id: 1,
                        path: "https://picsum.photos/seed/a/200/300",
                        title: "image",
                    },
                ],
                category: ["cell-phone"],
                brand: "apple",
                seller: {
                    email: "sdfsdf@sdfs.com",
                    firstName: "first",
                    lastName: "second",
                    id: 123,
                },
                slug: "slug",
                status: "AVAILABLE",
                stock: 123,
            },
            message: "",
        };
        return fakeData;

        return await Backend.apply<Product>({
            ...endpoints.backendService.endpoints.product.getSingle,
        });
    }
    async delete(id: number): Promise<GenericResponse<null>> {
        return await Backend.applyAuthenticated<null>({
            ...endpoints.backendService.endpoints.product.delete,
            url: endpoints.backendService.endpoints.product.delete.url.replace(
                "{id}",
                id.toString()
            ),
        });
    }

    async patch(id: number, data: Product): Promise<GenericResponse<Product>> {
        return await Backend.applyAuthenticated<Product>({
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
