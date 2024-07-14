import { request } from ".";
import { LoginCredentials, LoginResponse } from "../types/auth";


export async function login(user: LoginCredentials): Promise<LoginResponse> {
    const base64credentials = btoa(`${user.email}:${user.password}`)
    return request<LoginResponse, LoginCredentials>({
        method: "POST",
        url: "/login",
        headers: {
            "Authorization": `Basic ${base64credentials}`,
        },
    })
}
