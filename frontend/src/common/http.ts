import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance, AxiosError } from "axios";
import { backendServiceBaseUrl } from "./config";
import { HttpException } from "./exception";
import { BaseResponse } from "../types/response";

class Http {
    static async apply<D>(
        instance: AxiosInstance,
        config: AxiosRequestConfig
    ): Promise<D> {
        const response: AxiosResponse<D> = await instance.request<D>(config);
        if ([200, 201].includes(response.status)) {
            return response.data;
        }
        
        throw new HttpException(response);
    }
}

export class Backend {
    private constructor() { }

    private static axiosInstance = axios.create({
        baseURL: backendServiceBaseUrl,
        timeout: 3000,
    });

    static async apply<D>(config: AxiosRequestConfig): Promise<BaseResponse<D | null>> {
        try {
            return await Http.apply<BaseResponse<D | null>>(Backend.axiosInstance, config);
        } catch (err) {
            let resp = {
                status: false,
                messages: new Array<string>,
                data: null
            };

            if (err instanceof AxiosError) {
                if (err.response && err.response.data) {
                    return Promise.resolve(err.response?.data);
                } else {
                    resp.messages.push(err.message);
                    return Promise.resolve(resp);
                }
            } else {
                resp.messages.push("Unknown error occurred");
                return Promise.resolve(resp);
            }
        }
    }
}
