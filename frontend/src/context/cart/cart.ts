import React from "react";
import { Cart, CartItem } from "../../types/cart";

export interface CartSession {
    cart?: Cart;
    dispatch: React.Dispatch<Action>;
}

type Action = {
    type:
        | "INITIALIZE"
        | "ADD_TO_CART"
        | "REMOVE_FROM_CART"
        | "UPDATE_CART_ITEM_COUNT";
    payload: Record<string, unknown>;
};

export const defaultValues: CartSession = {
    cart: undefined,
    dispatch: () => null,
};

export const CartSessionContext =
    React.createContext<CartSession>(defaultValues);

CartSessionContext.displayName = "Cart-Session";

export const CartSessionReducer = (prevState: CartSession, action: Action) => {
    switch (action.type) {
        case "INITIALIZE": {
            const newState = {
                ...prevState,
                cart: action.payload.cart as unknown as Cart,
            };
            return newState;
        }
        case "UPDATE_CART_ITEM_COUNT": {
            const newState = { ...prevState };
            const item = newState.cart?.items.filter(
                (it) => it === action.payload.id
            )[0];
            if (item) {
                item.quantity += action.payload.count as unknown as number;
            }
            return newState;
        }
        case "ADD_TO_CART": {
            const newState = { ...prevState };
            newState.cart?.items.push(
                action.payload.product as unknown as CartItem
            );
            return newState;
        }
        case "REMOVE_FROM_CART": {
            const newState = { ...prevState };
            if (newState.cart) {
                const items = newState?.cart?.items.filter(
                    (it) => it !== action.payload.id
                );
                if (items) {
                    newState.cart.items = items;
                }
            }
            return newState;
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
};

export const initializeCart = (
    dispatch: React.Dispatch<Action>,
    payload: { cart: Cart }
) => {
    dispatch({
        type: "INITIALIZE",
        payload,
    });
};

export const addItemToCart = (
    dispatch: React.Dispatch<Action>,
    payload: CartItem
) => {
    dispatch({
        type: "ADD_TO_CART",
        payload,
    });
};

export const updateItemCounter = (
    dispatch: React.Dispatch<Action>,
    payload: { count: number }
) => {
    dispatch({
        type: "UPDATE_CART_ITEM_COUNT",
        payload,
    });
};

export const removeItemFromCart = (
    dispatch: React.Dispatch<Action>,
    payload: { id: number }
) => {
    dispatch({
        type: "REMOVE_FROM_CART",
        payload,
    });
};
