import { Backend } from "../common/http";
import { Service } from "../common/service";
import { Category } from "../types/category";
import { GenericResponse } from "../types/response";
import { endpoints } from "../common/config";

class CategoryService implements Service<Category, Category, number> {
    async create(data: Category): Promise<GenericResponse<Category>> {
        return await Backend.apply<Category>({
            ...endpoints.backendService.endpoints.category.add,
            data: data,
        });
    }
    async getAll(): Promise<GenericResponse<Partial<Category>[]>> {
        return await Backend.apply<Category[]>({
            ...endpoints.backendService.endpoints.category.getAll,
        });
    }
    async get(id: number): Promise<GenericResponse<Category>> {
        return await Backend.applyAuthenticated<Category>({
            ...endpoints.backendService.endpoints.category.getSingle,
        });
    }
    async delete(id: number): Promise<GenericResponse<null>> {
        return await Backend.applyAuthenticated<null>({
            ...endpoints.backendService.endpoints.category.delete,
            url: endpoints.backendService.endpoints.category.delete.url.replace(
                "{id}",
                id.toString()
            ),
        });
    }
    async patch(
        id: number,
        data: Category
    ): Promise<GenericResponse<Category>> {
        return await Backend.applyAuthenticated<Category>({
            ...endpoints.backendService.endpoints.category.update,
            url: endpoints.backendService.endpoints.category.update.url.replace(
                "{id}",
                id.toString()
            ),
            data,
        });
    }
}

export const categoryService = new CategoryService();
