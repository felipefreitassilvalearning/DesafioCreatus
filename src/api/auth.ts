import { request } from ".";
import { AuthResponse, LoginCredentials } from "../types/auth";


export async function login(user: LoginCredentials): Promise<AuthResponse> {
    const base64credentials = btoa(`${user.email}:${user.password}`)
    return request<AuthResponse, LoginCredentials>({
        method: "POST",
        url: "/login",
        headers: {
            "Authorization": `Basic ${base64credentials}`,
        },
    })
}

export async function authenticate(token: string): Promise<AuthResponse> {
    return request<AuthResponse, string>({
        method: "GET",
        url: "/auth",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}
