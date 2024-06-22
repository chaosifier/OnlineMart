import { endpoints } from "../common/config";
import { Backend } from "../common/http";
import { Service } from "../common/service";
import { GenericResponse } from "../types/response";
import { Role } from "../types/role";

class ProductService implements Service<Role, Role, number> {
    create(data: Role): Promise<GenericResponse<Partial<Role>>> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<GenericResponse<Partial<Role>[]>> {
        return Backend.applyAuthenticated<Role[]>({
            ...endpoints.backendService.endpoints.role.getAll,
        });
    }
    get(id: number): Promise<GenericResponse<Role | null>> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<GenericResponse<null>> {
        throw new Error("Method not implemented.");
    }
    patch(id: number, data: Role): Promise<GenericResponse<Role>> {
        throw new Error("Method not implemented.");
    }
}

export const productService = new ProductService();
