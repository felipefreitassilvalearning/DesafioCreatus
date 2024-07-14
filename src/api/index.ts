import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";


export const api = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 1000,    
});

export async function request<T, D>(options: AxiosRequestConfig<D>): Promise<T> {
    try {
        const response = await api.request<T, AxiosResponse<T>, D>({
            // TODO: Add authorization headers
            ...options,
        })
        return response.data
    } catch (error) {
        if (axios.isAxiosError<T, D>(error)) {
            throw new AxiosError("API request failed", error.code, error.config, error.request, error.response)
        }
        throw new Error("API request failed: " + error)
    }
}
