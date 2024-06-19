import { BaseResponse } from "../types/response";
import {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
} from "../types/user";

export interface Service<R, D, I> {
    login(data: LoginRequest): Promise<BaseResponse<LoginResponse | null>>;
    register(
        data: RegisterRequest
    ): Promise<BaseResponse<RegisterResponse | null>>;
    create(data: D): Promise<R>;
    getAll(): Promise<R[]>;
    get(id: I): Promise<R>;
    delete(id: I): Promise<void>;
    patch(id: I, data: D): Promise<void>;
}
