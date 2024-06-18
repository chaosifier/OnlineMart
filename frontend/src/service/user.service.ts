import { endpoints } from "../common/config";
import { Backend } from "../common/http";
import { Service } from "../common/service";
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, User } from "../types/user";

class UserService implements Service<User, User, number> {
    login(data: LoginRequest): Promise<LoginResponse>{
        let resp = Backend.apply<LoginResponse>({
            ...endpoints.backendService.endpoints.user.login,
            data: data
        });
        return resp;
    }

    register(data: RegisterRequest): Promise<RegisterResponse>{
        let resp = Backend.apply<RegisterResponse>({
            ...endpoints.backendService.endpoints.user.register,
            data: data
        });
        return resp;
    }

    create(data: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    get(id: number): Promise<User> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    patch(id: number, data: User): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export const userService = new UserService();
