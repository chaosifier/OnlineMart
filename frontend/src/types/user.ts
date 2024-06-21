export type User = {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
};

export type LoginRequest = {
    email: string;
    password: string;
};

export type LoginResponse = {
    accessToken: string;
    roles: string[];
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
