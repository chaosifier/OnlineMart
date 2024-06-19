import React, { useReducer } from "react";
import { UserSession, UserSessionContext, UserSessionReducer } from "./session";

interface IProps {
    children?: React.ReactNode;
}

const defaultValues: UserSession = {
    isLoggedIn: false,
    user: null,
};

export const UserSessionProvider: React.FC<IProps> = ({ children }) => {
    const [state, dispatch] = useReducer(UserSessionReducer, defaultValues);

    return (
        <UserSessionContext.Provider value={{ ...state, dispatch }}>
            {children && children}
        </UserSessionContext.Provider>
    );
};
