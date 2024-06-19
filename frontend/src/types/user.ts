export type User = {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
};

export type LoginRequest = {
    email: string;
    password: string
}

export type LoginResponse = {
    accessToken : string;
}

export type RegisterRequest = {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export type RegisterResponse = {
    
}