import { Service } from "../common/service";
import { CartProduct } from "../types/cart";
import { GenericResponse } from "../types/response";

class CartService implements Service<CartProduct, CartProduct, number> {
    create(data: CartProduct): Promise<GenericResponse<Partial<CartProduct>>> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<GenericResponse<Partial<CartProduct>[]>> {
        throw new Error("Method not implemented.");
    }
    get(id: number): Promise<GenericResponse<CartProduct | null>> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<GenericResponse<null>> {
        throw new Error("Method not implemented.");
    }
    patch(
        id: number,
        data: CartProduct
    ): Promise<GenericResponse<CartProduct>> {
        throw new Error("Method not implemented.");
    }
}

export const cartService = new CartService();
