/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
    AxiosRequestConfig,
    AxiosResponse,
    AxiosInstance,
    AxiosError,
} from "axios";
import { backendServiceBaseUrl } from "./config";
import { GenericResponse, BaseResponseWithSuccess } from "../types/response";

class Http {
    static async apply<D>(
        instance: AxiosInstance,
        config: AxiosRequestConfig
    ): Promise<D> {
        const response: AxiosResponse<D> = await instance.request<D>(config);
        return response.data;
    }
}

export class Backend {
    private constructor() {}

    private static axiosInstance = axios.create({
        baseURL: backendServiceBaseUrl,
        timeout: 3000,
    });

    static async apply<D>(
        config: AxiosRequestConfig
    ): Promise<GenericResponse<D>> {
        try {
            return Http.apply<BaseResponseWithSuccess<D>>(
                Backend.axiosInstance,
                config
            );
        } catch (err) {
            const resp = {
                status: false,
                message: "",
                data: {},
            };

            if (err instanceof AxiosError) {
                if (err.response && err.response.data) {
                    return Promise.resolve(err.response?.data);
                } else {
                    resp.message = err.message;
                    return Promise.resolve(resp as any);
                }
            } else {
                resp.message = "Unknown error occurred";
                return Promise.resolve(resp as any);
            }
        }
    }

    static async applyAuthenticated<D>(
        config: AxiosRequestConfig
    ): Promise<GenericResponse<D>> {
        try {
            const conf = {
                ...config,
                headers: {
                    ...config.headers,
                    ["Authorization"]: localStorage.getItem("accessToken"),
                },
            };
            return Http.apply<BaseResponseWithSuccess<D>>(
                Backend.axiosInstance,
                conf
            );
        } catch (err) {
            const resp = {
                status: false,
                message: "",
                data: {},
            };

            if (err instanceof AxiosError) {
                if (err.response && err.response.data) {
                    return Promise.resolve(err.response?.data);
                } else {
                    resp.message = err.message;
                    return Promise.resolve(resp as any);
                }
            } else {
                resp.message = "Unknown error occurred";
                return Promise.resolve(resp as any);
            }
        }
    }
}
