import { Service } from "../common/service";
import { User } from "../types/user";

class UserService implements Service<User, User, number> {
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
