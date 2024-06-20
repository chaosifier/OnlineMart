import { endpoints } from "../common/config";
import { Backend } from "../common/http";
import { Service } from "../common/service";
import { GenericResponse } from "../types/response";
import {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    User,
} from "../types/user";

class UserService implements Service<User, User, number> {
    create(data: User): Promise<GenericResponse<Partial<User>>> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<GenericResponse<Partial<User>[]>> {
        throw new Error("Method not implemented.");
    }
    get(id: number): Promise<GenericResponse<User | null>> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<GenericResponse<null>> {
        throw new Error("Method not implemented.");
    }
    patch(id: number, data: User): Promise<GenericResponse<User>> {
        throw new Error("Method not implemented.");
    }
    async login(data: LoginRequest): Promise<GenericResponse<LoginResponse>> {
        return await Backend.apply<LoginResponse>({
            ...endpoints.backendService.endpoints.user.login,
            data: data,
        });
    }

    async register(
        data: RegisterRequest
    ): Promise<GenericResponse<RegisterResponse | null>> {
        return await Backend.apply<RegisterResponse>({
            ...endpoints.backendService.endpoints.user.register,
            data: data,
        });
    }
}

export const userService = new UserService();
