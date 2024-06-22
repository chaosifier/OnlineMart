import { Product } from "./product";
import { UserBase } from "./user";

export type CartItem = {
    id: number;
    product: Product;
    quantity: number;
    price: number;
};

export type Cart = {
    user: UserBase;
    items: CartItem[];
    totalPrice: number;
};
