import React from "react";
import { User } from "../../types/user";

export interface UserSession {
    user: User | null;
    isLoggedIn: boolean;
    dispatch?: React.Dispatch<Action>;
}

type Action = {
    type: "LOGIN" | "LOGOUT" | "REFRESH";
    payload: Record<string, unknown>;
};

export const UserSessionContext = React.createContext<UserSession>({
    isLoggedIn: false,
    user: null,
});

UserSessionContext.displayName = "User-Session";

export const UserSessionReducer = (prevState: UserSession, action: Action) => {
    switch (action.type) {
        case "LOGIN": {
            const newState = { ...prevState, ...action.payload };
            return newState;
        }
        case "LOGOUT": {
            return { user: null, isLoggedIn: false };
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
};

export const addUserSession = (
    dispatch: (arg0: Action) => void,
    payload: User & { access_token: string; refresh_token: string }
) => {
    dispatch({
        type: "LOGIN",
        payload,
    });
};

export const removeUserSession = (dispatch: (arg0: Action) => void) => {
    dispatch({
        type: "LOGOUT",
        payload: {},
    });
};
