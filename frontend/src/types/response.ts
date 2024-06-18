export type BaseResponse<T> = {
    status: boolean,
    // data: T | ErrorPayload<U>,
    data: T | Array<ErrorPayloadItem>,
    message: string
}

export type PaginatedPayload<T> = {
    totalRecords: number,
    records: Array<T>
}

// export type ErrorPayload<T> = {
//     [key in keyof T] : Array<string>
// }

export type ErrorPayloadItem = {
    key: string,
    values: Array<string>
}