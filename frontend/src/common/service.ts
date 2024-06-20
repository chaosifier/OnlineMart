import { BaseResponse } from "../types/response";

export interface Service<R, D, I> {
    create(data: D): Promise<BaseResponse<R>>;
    getAll(): Promise<BaseResponse<R[] | null>>;
    get(id: I): Promise<BaseResponse<R | null>>;
    delete(id: I): Promise<BaseResponse<null>>;
    patch(id: I, data: D): Promise<BaseResponse<null>>;
}
