import React from "react";
import { User } from "../../types/user";

type SessionUser = User & {
    access_token: string;
    refresh_token: string;
};

export interface UserSession {
    user: SessionUser | null;
    isLoggedIn: boolean;
    dispatch: React.Dispatch<Action>;
}

type Action = {
    type: "LOGIN" | "LOGOUT" | "REFRESH";
    payload: Record<string, unknown>;
};

export const defaultValues: UserSession = {
    isLoggedIn: false,
    user: null,
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
                user: action.payload.user as unknown as SessionUser,
            };
            return newState;
        }
        case "LOGOUT": {
            return { ...prevState, user: null, isLoggedIn: false };
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
};

export const addUserSession = (
    dispatch: React.Dispatch<Action>,
    payload: User & { access_token: string; refresh_token: string }
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
};
