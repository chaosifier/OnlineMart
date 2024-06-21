import { Backend } from "../common/http";
import { Service } from "../common/service";
import { Cart } from "../types/cart";
import { GenericResponse } from "../types/response";
import { endpoints } from "../common/config";

class CartService implements Service<Cart, Cart, number> {
    create(data: Cart): Promise<GenericResponse<Partial<Cart>>> {
        throw new Error("Method not implemented.");
    }
    addToCart(data: { id: number; quantity: number }) {
        return Backend.applyAuthenticated({
            ...endpoints.backendService.endpoints.cart.add,
            data,
        });
    }
    getCartItems(): Promise<GenericResponse<Cart>> {
        return Backend.applyAuthenticated(
            endpoints.backendService.endpoints.cart.getCartItems
        );
    }
    getAll(): Promise<GenericResponse<Partial<Cart>[]>> {
        throw new Error("Method not implemented.");
    }
    get(id: number): Promise<GenericResponse<Cart | null>> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<GenericResponse<null>> {
        throw new Error("Method not implemented.");
    }
    patch(id: number, data: Cart): Promise<GenericResponse<Cart>> {
        throw new Error("Method not implemented.");
    }
}

export const cartService = new CartService();
