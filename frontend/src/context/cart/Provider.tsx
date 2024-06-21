import React, { useReducer } from "react";
import { CartSessionContext, CartSessionReducer, defaultValues } from "./cart";

interface IProps {
    children?: React.ReactNode;
}

export const CartSessionProvider: React.FC<IProps> = ({ children }) => {
    const [state, dispatch] = useReducer(CartSessionReducer, defaultValues);

    return (
        <CartSessionContext.Provider value={{ ...state, dispatch }}>
            {children && children}
        </CartSessionContext.Provider>
    );
};
