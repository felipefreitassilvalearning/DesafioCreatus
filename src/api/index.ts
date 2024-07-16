import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { getToken } from "../utils/tokenHelper";


export const api = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 1000,    
});

export async function request<T, D>(options: AxiosRequestConfig<D>): Promise<T> {
    const userToken = getToken();
    if (userToken) {
        const authHeaders = {
            Authorization: `Bearer ${userToken}`,
        };
        if (!options.headers) {
            options.headers = authHeaders;
        } else {
            if (!options.headers.Authorization) {
                options.headers.Authorization = authHeaders.Authorization;
            }
        }
    }
    try {
        const response = await api.request<T, AxiosResponse<T>, D>(options)
        return response.data
    } catch (error) {
        if (axios.isAxiosError<T, D>(error)) {
            throw new AxiosError("API request failed", error.code, error.config, error.request, error.response)
        }
        throw new Error("API request failed: " + error)
    }
}
