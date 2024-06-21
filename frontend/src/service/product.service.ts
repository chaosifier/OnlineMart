import { Backend } from "../common/http";
import { Service } from "../common/service";
import { Product } from "../types/product";
import { GenericResponse } from "../types/response";
import { endpoints } from "../common/config";

class ProductService implements Service<Product, Product, number> {
    async create(data: Product): Promise<GenericResponse<Partial<Product>>> {
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

    async getMyProducts(): Promise<GenericResponse<Product[]>> {
        return await Backend.applyAuthenticated<Product[]>({
            ...endpoints.backendService.endpoints.product.viewMyProducts,
        });
    }
}

export const productService = new ProductService();
