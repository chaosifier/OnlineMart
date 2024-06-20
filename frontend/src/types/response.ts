type Response = {
    status: boolean;
    message: string;
};

export type GenericResponse<T> = Response & {
    data?: T | ErrorPayload;
};

export type BaseResponseWithSuccess<T> = Response & {
    data: T;
};

export type BaseResponseWithError = Response & {
    data?: ErrorPayload;
};

export type PaginatedPayload<T> = {
    totalRecords: number;
    records: Array<T>;
};

export type ErrorPayload = {
    [key: string]: Array<string>;
};
