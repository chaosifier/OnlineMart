import React, { useReducer, useEffect } from "react";
import {
    UserSessionContext,
    UserSessionReducer,
    defaultValues,
    addUserSession,
} from "./session";
import { userService } from "../../service/user.service";
import { User } from "../../types/user";

interface IProps {
    children?: React.ReactNode;
}

export const UserSessionProvider: React.FC<IProps> = ({ children }) => {
    const [state, dispatch] = useReducer(UserSessionReducer, defaultValues);

    useEffect(() => {
        userService.getMyinfo().then((resp) => {
            addUserSession(dispatch, {
                access_token: localStorage.getItem("accessToken") ?? "",
                refresh_token: localStorage.getItem("refreshToken") ?? "",
                user: resp.data as User,
            });
        });
    }, []);

    return (
        <UserSessionContext.Provider value={{ ...state, dispatch }}>
            {children && children}
        </UserSessionContext.Provider>
    );
};
