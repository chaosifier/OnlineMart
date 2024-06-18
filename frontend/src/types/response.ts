export type BaseResponse<T> = {
    status: boolean,
    data: T,
    messages: Array<string>
}

export type PaginatedPayload<T> = {
    totalRecords: number,
    records: Array<T>
}

export type errorType<T> = {
    data: {
        [key in keyof T] : Array<string>
    }
}