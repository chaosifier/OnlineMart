import { Backend } from "../common/http";
import { Service } from "../common/service";
import { Product, STATUS } from "../types/product";
import { GenericResponse } from "../types/response";
import { endpoints } from "../common/config";

export type ProductFilterParam = {
    name: string | null;
    brandId: number | null;
    categoryId: number | null;
    minPrice: number | null;
    maxPrice: number | null;
    sellerId: number | null;
    status: string | null;
};

class ProductService implements Service<Product, Product, number> {
    async create(data: Product): Promise<GenericResponse<Partial<Product>>> {
        return await Backend.applyAuthenticated<Product>({
            ...endpoints.backendService.endpoints.product.add,
            data: data,
        });
    }
    async filter(
        params: Partial<ProductFilterParam>
    ): Promise<GenericResponse<Partial<Product>[]>> {
        let query = "";
        let key: keyof typeof params;
        for (key in params) query += `${key}=${params[key]}&`;

        return await Backend.apply<Product[]>({
            ...endpoints.backendService.endpoints.product.getAll,
            url: `${endpoints.backendService.endpoints.product.getAll.url}?${query}`,
        });
    }

    async createProduct(
        data: Partial<Product>
    ): Promise<GenericResponse<Partial<Product>>> {
        return await Backend.applyAuthenticated<Product>({
            ...endpoints.backendService.endpoints.product.add,
            data: data,
        });
    }

    async getAll(): Promise<GenericResponse<Partial<Product>[]>> {
        return await Backend.apply<Product[]>({
            ...endpoints.backendService.endpoints.product.getAll,
        });
    }
    async get(id: number): Promise<GenericResponse<Product>> {
        return await Backend.apply<Product>({
            ...endpoints.backendService.endpoints.product.getSingle,
            url: endpoints.backendService.endpoints.product.getSingle.url.replace(
                "{id}",
                id.toString()
            ),
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

    async patchProductStatus(
        id: number,
        status: STATUS
    ): Promise<GenericResponse<Product>> {
        return await Backend.applyAuthenticated<Product>({
            ...endpoints.backendService.endpoints.product.update,
            url: endpoints.backendService.endpoints.product.update.url.replace(
                "{id}",
                id.toString()
            ),
            data: {
                productStatus: status,
            },
        });
    }

    async getMyProducts(): Promise<GenericResponse<Product[]>> {
        return await Backend.applyAuthenticated<Product[]>({
            ...endpoints.backendService.endpoints.product.viewMyProducts,
        });
    }
}

export const productService = new ProductService();
