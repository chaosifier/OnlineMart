import React, { useReducer } from "react";
import {
    UserSessionContext,
    UserSessionReducer,
    defaultValues,
} from "./session";

interface IProps {
    children?: React.ReactNode;
}

export const UserSessionProvider: React.FC<IProps> = ({ children }) => {
    const [state, dispatch] = useReducer(UserSessionReducer, defaultValues);

    return (
        <UserSessionContext.Provider value={{ ...state, dispatch }}>
            {children && children}
        </UserSessionContext.Provider>
    );
};
