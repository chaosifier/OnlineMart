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
