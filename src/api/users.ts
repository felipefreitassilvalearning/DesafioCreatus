import { AxiosRequestConfig, AxiosResponse } from "axios";

import { api } from ".";
import { User, UserCreate } from "../types/users";


async function request<T, D>(options: AxiosRequestConfig<D>): Promise<T> {
    try {
        const response = await api.request<T, AxiosResponse<T>, D>({
            // TODO: Add authorization headers
            ...options,
        })
        return response.data
    } catch (error) {
        throw new Error("API request failed: " + error)
    }
}

export async function createUser(user: UserCreate): Promise<string> {
    return request<string, UserCreate>({
        method: "POST",
        url: "/user",
        headers: {
            "Content-Type": "application/json",
        },
        data: user,
    })
}

// Query param for filtering not implemented in the API
export async function readUsers(
    // query?: string | null
): Promise<User[]> {
    return request<User[], void>({
        method: "GET",
        url: "/users",
        // params: { query },
    })
}

export async function readUser(userId: string): Promise<User> {
    return request<User, void>({
        method: "GET",
        url: `/user/${userId}`,
    })
}

export async function updateUser(userId: string, user: UserCreate): Promise<string> {
    return request({
        method: "PUT",
        url: `/user/${userId}`,
        headers: {
            "Content-Type": "application/json",
        },
        data: user,
    })
}

// Not implemented in the API
export async function deleteUser(userId: string): Promise<string> {
    throw new Error("Not implemented")
    return request<string, void>({
        method: "DELETE",
        url: `/user/${userId}`,
    })
}
