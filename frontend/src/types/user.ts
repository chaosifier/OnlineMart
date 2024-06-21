import { BaseRole } from "./role";

export type UserBase = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
};

export type User = UserBase & {
    image: string;
    roles?: BaseRole[];
};

export type LoginRequest = {
    email: string;
    password: string;
};

export type LoginResponse = {
    access_token: string;
    refresh_token: string;
    userData: User;
};

export type RegisterRequest = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

export type RegisterResponse = {};

export enum USER_ROLES {
    ADMIN = "ADMIN",
    CUSTOMER = "CUSTOMER",
    SELLER = "SELLER",
}
