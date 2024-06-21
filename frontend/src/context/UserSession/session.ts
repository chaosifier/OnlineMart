import React from "react";
import { User } from "../../types/user";

export interface UserSession {
    user: User | null;
    isLoggedIn: boolean;
    access_token: string;
    refresh_token: string;
    dispatch: React.Dispatch<Action>;
}

type Action = {
    type: "LOGIN" | "LOGOUT" | "REFRESH";
    payload: Record<string, unknown>;
};

export const defaultValues: UserSession = {
    isLoggedIn: false,
    user: null,
    access_token: "",
    refresh_token: "",
    dispatch: () => null,
};
export const UserSessionContext =
    React.createContext<UserSession>(defaultValues);

UserSessionContext.displayName = "User-Session";

export const UserSessionReducer = (prevState: UserSession, action: Action) => {
    switch (action.type) {
        case "LOGIN": {
            const newState = {
                ...prevState,
                user: action.payload.user as unknown as User,
                access_token: action.payload.access_token as string,
                refresh_token: action.payload.refresh_token as string,
                isLoggedIn: true,
            };
            return newState;
        }
        case "LOGOUT": {
            return {
                ...prevState,
                user: null,
                access_token: "",
                refresh_token: "",
                isLoggedIn: false,
            };
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
};

export const addUserSession = (
    dispatch: React.Dispatch<Action>,
    payload: { access_token: string; refresh_token: string; user: User }
) => {
    dispatch({
        type: "LOGIN",
        payload,
    });
};

export const removeUserSession = (dispatch: React.Dispatch<Action>) => {
    dispatch({
        type: "LOGOUT",
        payload: {},
    });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
};
