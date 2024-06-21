import { endpoints } from "../common/config";
import { Backend } from "../common/http";
import { Service } from "../common/service";
import { BrandEntry } from "../types/product";
import { GenericResponse } from "../types/response";

class BrandService implements Service<BrandEntry, BrandEntry, number> {
    create(data: BrandEntry): Promise<GenericResponse<Partial<BrandEntry>>> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<GenericResponse<Partial<BrandEntry>[]>> {
        return Backend.apply<BrandEntry[]>({
            ...endpoints.backendService.endpoints.brand.getAll,
        });
    }
    get(id: number): Promise<GenericResponse<BrandEntry | null>> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<GenericResponse<null>> {
        throw new Error("Method not implemented.");
    }
    patch(id: number, data: BrandEntry): Promise<GenericResponse<BrandEntry>> {
        throw new Error("Method not implemented.");
    }
}

export const brandService = new BrandService();
