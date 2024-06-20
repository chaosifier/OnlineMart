import { User } from "./user";

export type BaseRole = {
    id: number;
    title: string;
    slug: string;
};

export type Role = BaseRole & {
    users: User[];
};
