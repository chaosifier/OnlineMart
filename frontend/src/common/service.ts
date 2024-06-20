import { GenericResponse } from "../types/response";

export interface Service<R, D, I> {
    create(data: D): Promise<GenericResponse<Partial<R>>>;
    getAll(): Promise<GenericResponse<Partial<R>[]>>;
    get(id: I): Promise<GenericResponse<R | null>>;
    delete(id: I): Promise<GenericResponse<null>>;
    patch(id: I, data: D): Promise<GenericResponse<D>>;
}
